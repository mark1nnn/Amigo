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

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
}

function normalizeLanguage(value = "") {
  const language = String(value).trim().toLowerCase();
  return ["pl", "uk", "en"].includes(language) ? language : "unknown";
}

function clampText(value = "", max = 300) {
  return String(value || "").trim().slice(0, max);
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
    return jsonResponse({ ok: false, error: "Server configuration error" }, 500, origin);
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body" }, 400, origin);
  }

  const name = clampText(data.name, 80);
  const contact = clampText(data.contact, 120);
  const projectType = clampText(data.projectType || data.project, 120);
  const budget = clampText(data.budget, 120);
  const deadline = clampText(data.deadline, 120);
  const hasDomain = clampText(data.hasDomain, 120);
  const message = clampText(data.message, 2000);
  const language = normalizeLanguage(data.language);
  const sourcePage = clampText(data.sourcePage, 500);
  const website = clampText(data.website, 200);
  const turnstileToken = clampText(data["cf-turnstile-response"], 2048);

  if (website) {
    return jsonResponse({ ok: true }, 200, origin);
  }

  if (name.length < 2 || name.length > 80) {
    return jsonResponse({ ok: false, error: "Invalid name" }, 400, origin);
  }

  if (contact.length < 3 || contact.length > 120) {
    return jsonResponse({ ok: false, error: "Invalid contact" }, 400, origin);
  }

  if (projectType.length > 120 || budget.length > 120 || deadline.length > 120 || hasDomain.length > 120) {
    return jsonResponse({ ok: false, error: "Invalid project details" }, 400, origin);
  }

  if (message.length < 10 || message.length > 2000) {
    return jsonResponse({ ok: false, error: "Invalid message" }, 400, origin);
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, request, env);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: "Anti-spam check failed" }, 400, origin);
  }

  const safe = {
    name: escapeHtml(name),
    contact: escapeHtml(contact),
    projectType: escapeHtml(projectType || "Nie wskazano"),
    budget: escapeHtml(budget || "Nie wskazano"),
    deadline: escapeHtml(deadline || "Nie wskazano"),
    hasDomain: escapeHtml(hasDomain || "Nie wskazano"),
    language: escapeHtml(language),
    sourcePage: escapeHtml(sourcePage || "Nie wskazano"),
    message: escapeHtml(message).replaceAll("\n", "<br>")
  };

  const subject = `Nowe zapytanie z Amigo [${language.toUpperCase()}] - ${name}`;
  const text = `
Nowe zapytanie z formularza Amigo

Imię: ${name}
Kontakt: ${contact}
Język: ${language}
Strona źródłowa: ${sourcePage || "Nie wskazano"}
Typ projektu: ${projectType || "Nie wskazano"}
Budżet: ${budget || "Nie wskazano"}
Termin: ${deadline || "Nie wskazano"}
Domena: ${hasDomain || "Nie wskazano"}

Wiadomość:
${message}
`.trim();

  const html = `
    <h2>Nowe zapytanie z formularza Amigo</h2>
    <p><strong>Imię:</strong> ${safe.name}</p>
    <p><strong>Kontakt:</strong> ${safe.contact}</p>
    <p><strong>Język:</strong> ${safe.language}</p>
    <p><strong>Strona źródłowa:</strong> ${safe.sourcePage}</p>
    <p><strong>Typ projektu:</strong> ${safe.projectType}</p>
    <p><strong>Budżet:</strong> ${safe.budget}</p>
    <p><strong>Termin:</strong> ${safe.deadline}</p>
    <p><strong>Domena:</strong> ${safe.hasDomain}</p>
    <p><strong>Wiadomość:</strong></p>
    <p>${safe.message}</p>
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
