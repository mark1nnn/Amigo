function jsonResponse(data, status = 200, origin = "") {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }

  return new Response(JSON.stringify(data), { status, headers });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAllowedOrigin(origin, env) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return allowedOrigins.includes(origin);
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return true;
  }

  if (!token) {
    return false;
  }

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData
    }
  );

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
}

export async function onRequestOptions({ request, env }) {
  const origin = request.headers.get("Origin") || "";

  if (!isAllowedOrigin(origin, env)) {
    return jsonResponse({ ok: false, error: "Forbidden origin" }, 403);
  }

  return jsonResponse({ ok: true }, 200, origin);
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin") || "";

  if (!isAllowedOrigin(origin, env)) {
    return jsonResponse({ ok: false, error: "Forbidden origin" }, 403);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL || !env.FROM_EMAIL) {
    console.error("Missing required environment variables");
    return jsonResponse(
      { ok: false, error: "Server configuration error" },
      500,
      origin
    );
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body" }, 400, origin);
  }

  const name = String(data.name || "").trim();
  const contact = String(data.contact || "").trim();
  const project = String(data.project || "").trim();
  const message = String(data.message || "").trim();
  const website = String(data.website || "").trim();
  const turnstileToken = String(data["cf-turnstile-response"] || "").trim();

  if (website) {
    return jsonResponse({ ok: true }, 200, origin);
  }

  if (name.length < 2 || name.length > 80) {
    return jsonResponse({ ok: false, error: "Invalid name" }, 400, origin);
  }

  if (contact.length < 3 || contact.length > 120) {
    return jsonResponse({ ok: false, error: "Invalid contact" }, 400, origin);
  }

  if (project.length > 120) {
    return jsonResponse({ ok: false, error: "Invalid project type" }, 400, origin);
  }

  if (message.length < 10 || message.length > 2000) {
    return jsonResponse({ ok: false, error: "Invalid message" }, 400, origin);
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, request, env);

  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: "Anti-spam check failed" }, 400, origin);
  }

  const safeName = escapeHtml(name);
  const safeContact = escapeHtml(contact);
  const safeProject = escapeHtml(project || "Nie wskazano");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  const subject = `Nowe zapytanie z Amigo - ${name}`;

  const text = `
Nowe zapytanie z formularza Amigo

Imie: ${name}
Kontakt: ${contact}
Typ projektu: ${project || "Nie wskazano"}

Wiadomosc:
${message}
`.trim();

  const html = `
    <h2>Nowe zapytanie z formularza Amigo</h2>
    <p><strong>Imie:</strong> ${safeName}</p>
    <p><strong>Kontakt:</strong> ${safeContact}</p>
    <p><strong>Typ projektu:</strong> ${safeProject}</p>
    <p><strong>Wiadomosc:</strong></p>
    <p>${safeMessage}</p>
  `;

  const emailPayload = {
    from: env.FROM_EMAIL,
    to: [env.CONTACT_EMAIL],
    subject,
    text,
    html
  };

  if (isValidEmail(contact)) {
    emailPayload.reply_to = contact;
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailPayload)
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend error:", errorText);

    return jsonResponse({ ok: false, error: "Email sending failed" }, 502, origin);
  }

  return jsonResponse({ ok: true }, 200, origin);
}

export async function onRequestGet() {
  return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
}
