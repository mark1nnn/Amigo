const iconTemplates = {
  "arrow-right": '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
  "arrow-up": '<path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "clipboard-check": '<rect width="8" height="4" x="8" y="2" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path>',
  "code": '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  "compass": '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',
  "facebook": '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
  "handshake": '<path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path>',
  "instagram": '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>',
  "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
  "menu": '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>',
  "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
  "message-square-text": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13 8H7"></path><path d="M17 12H7"></path>',
  "messages-square": '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>',
  "search": '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
  "send": '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
  "send-horizontal": '<path d="m3 3 3 9-3 9 19-9Z"></path><path d="M6 12h16"></path>',
  "x": '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>'
};

const refreshIcons = () => {
  document.querySelectorAll("i[data-lucide]").forEach((element) => {
    const template = iconTemplates[element.dataset.lucide];
    if (!template) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("class", element.getAttribute("class") || "icon");
    svg.innerHTML = template;
    element.replaceWith(svg);
  });
};

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const languageMenus = document.querySelectorAll("[data-language-menu]");

const setHeaderState = () => {
  if (header) {
    header.classList.toggle("nav-scrolled", window.scrollY > 8);
  }
};

const renderMenuButton = () => {
  if (!menuToggle || !mobileMenu) return;
  const isOpen = mobileMenu.classList.contains("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? menuToggle.dataset.closeLabel : menuToggle.dataset.openLabel);
  menuToggle.innerHTML = isOpen ? '<i data-lucide="x" class="icon"></i>' : '<i data-lucide="menu" class="icon"></i>';
  refreshIcons();
};

const closeLanguageMenus = (exceptMenu = null) => {
  languageMenus.forEach((menu) => {
    if (menu === exceptMenu) return;
    menu.classList.remove("is-open");
    const toggle = menu.querySelector(".language-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
    renderMenuButton();
    closeLanguageMenus();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      renderMenuButton();
    });
  });
}

languageMenus.forEach((menu) => {
  const toggle = menu.querySelector(".language-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    closeLanguageMenus(menu);
  });
});

document.addEventListener("click", (event) => {
  if (![...languageMenus].some((menu) => menu.contains(event.target))) {
    closeLanguageMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (mobileMenu) {
      mobileMenu.classList.remove("is-open");
      renderMenuButton();
    }
    closeLanguageMenus();
  }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const getField = (form, name) => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLElement ? field : null;
};

const getValue = (form, name) => {
  const field = getField(form, name);
  return field && "value" in field ? String(field.value).trim() : "";
};

const setFormStatus = (form, message, isError = false) => {
  const status = form.querySelector(".form-status");
  if (!status) return;
  status.textContent = message;
  status.classList.remove("hidden");
  status.classList.toggle("is-error", isError);
};

const setFieldError = (form, name, message) => {
  const error = form.querySelector(`[data-error-for="${name}"]`);
  const field = getField(form, name);
  const label = field ? field.closest("label") : null;
  if (error) error.textContent = message;
  if (label) {
    label.classList.add("form-field-invalid");
    label.classList.remove("form-field-valid");
  }
};

const clearFieldError = (form, name) => {
  const error = form.querySelector(`[data-error-for="${name}"]`);
  const field = getField(form, name);
  const label = field ? field.closest("label") : null;
  if (error) error.textContent = "";
  if (label) {
    label.classList.remove("form-field-invalid");
    if (getValue(form, name)) {
      label.classList.add("form-field-valid");
    }
  }
};

const hasTurnstileResponse = (form) => Boolean(getValue(form, "cf-turnstile-response"));
const requiresTurnstile = (form) => Boolean(form.querySelector(".cf-turnstile")) && window.location.protocol !== "file:";

const validateForm = (form) => {
  let isValid = true;
  const name = getValue(form, "name");
  const contact = getValue(form, "contact");
  const message = getValue(form, "message");

  if (name.length < 2 || name.length > 80) {
    setFieldError(form, "name", form.dataset.validationName);
    isValid = false;
  } else {
    clearFieldError(form, "name");
  }

  if (contact.length < 3 || contact.length > 120) {
    setFieldError(form, "contact", form.dataset.validationContact);
    isValid = false;
  } else {
    clearFieldError(form, "contact");
  }

  if (message.length < 10 || message.length > 2000) {
    setFieldError(form, "message", form.dataset.validationMessage);
    isValid = false;
  } else {
    clearFieldError(form, "message");
  }

  if (requiresTurnstile(form) && !hasTurnstileResponse(form)) {
    setFormStatus(form, form.dataset.validationTurnstile, true);
    isValid = false;
  }

  return isValid;
};

const updateCounter = (form) => {
  const textarea = getField(form, "message");
  const counter = form.querySelector("[data-counter]");
  if (textarea && counter) {
    counter.textContent = `${String(textarea.value || "").length}/2000`;
  }
};

document.querySelectorAll(".contact-form").forEach((form) => {
  const sourcePage = getField(form, "sourcePage");
  if (sourcePage) {
    sourcePage.value = window.location.href;
  }

  ["name", "contact", "message"].forEach((name) => {
    const field = getField(form, name);
    if (!field) return;
    field.addEventListener("input", () => {
      if (name === "message") updateCounter(form);
      clearFieldError(form, name);
    });
  });

  updateCounter(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');

    if (!validateForm(form)) {
      if (!form.querySelector(".form-status").textContent) {
        setFormStatus(form, form.dataset.error, true);
      }
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    setFormStatus(form, form.dataset.sending);
    if (submitButton) submitButton.disabled = true;

    try {
      if (window.location.protocol !== "file:") {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({ ok: false }));
        if (!response.ok || !result.ok) {
          setFormStatus(form, form.dataset.error, true);
          return;
        }
      }

      form.reset();
      if (sourcePage) sourcePage.value = window.location.href;
      updateCounter(form);
      form.querySelectorAll(".form-field-valid, .form-field-invalid").forEach((item) => {
        item.classList.remove("form-field-valid", "form-field-invalid");
      });
      setFormStatus(form, form.dataset.success);
      if (window.turnstile) window.turnstile.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus(form, form.dataset.error, true);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

refreshIcons();
renderMenuButton();
