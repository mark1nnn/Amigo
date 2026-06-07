const portfolioProjects = [
  {
    id: "autohouse",
    title: "AutoHouse",
    type: "Landing page dla serwisu samochodowego",
    status: "Landing page",
    image: "assets/portfolio/sto-landing-cover.jpg",
    fullImage: "assets/portfolio/sto-landing-full.jpg",
    imageAlt: "Zrzut ekranu landing page dla serwisu samochodowego AutoHouse",
    url: "https://landingwebsite.markin4097.workers.dev/",
    accent: "blue",
    description: "Strona przygotowana dla lokalnego serwisu samochodowego z naciskiem na szybki kontakt, przejrzystą ofertę i formularz zapytań.",
    features: [
      "formularz kontaktowy",
      "sekcja usług",
      "CTA do kontaktu",
      "optymalizacja mobilna",
      "przygotowanie pod SEO"
    ],
    details: "Projekt pokazuje, jak uporządkować ofertę lokalnego serwisu i skrócić drogę od wejścia na stronę do wysłania zapytania."
  },
  {
    id: "landing-example",
    title: "Landing Website Example",
    type: "Projekt demonstracyjny",
    status: "Landing page",
    image: "assets/portfolio/sto-landing-cover.jpg",
    fullImage: "assets/portfolio/sto-landing-full.jpg",
    imageAlt: "Zrzut ekranu demonstracyjnego landing page dla firmy usługowej",
    url: "https://landingwebsite.markin4097.workers.dev/",
    accent: "green",
    description: "Przykład nowoczesnej strony dla firmy usługowej, pokazujący strukturę landing page, sekcje sprzedażowe i sposób prezentacji oferty.",
    features: [
      "hero",
      "oferta",
      "zalety",
      "proces",
      "formularz kontaktowy",
      "mobile-first"
    ],
    details: "Kierunek dla firmy, która chce szybko wystartować z kampanią, jasno opisać usługę i zbierać konkretne zapytania."
  },
  {
    id: "multipage-business",
    title: "Multi-page Business Website",
    type: "Projekt demonstracyjny",
    status: "Strona firmowa",
    image: "assets/portfolio/sto-multipage-cover.jpg",
    fullImage: "assets/portfolio/sto-multipage-full.jpg",
    imageAlt: "Zrzut ekranu demonstracyjnej wielostronicowej strony firmowej",
    url: "#",
    accent: "gold",
    description: "Przykład wielostronicowej strony firmowej dla biznesu, który potrzebuje osobnych podstron dla usług, informacji o firmie i kontaktu.",
    features: [
      "kilka podstron",
      "struktura SEO",
      "sekcje usług",
      "FAQ",
      "formularz kontaktowy"
    ],
    details: "Kierunek dla firm, które chcą rozwijać widoczność w Google i potrzebują osobnych treści pod konkretne usługi."
  }
];

const messages = {
  success: "Dziękujemy! Zgłoszenie zostało przyjęte. Odezwiemy się z konkretnymi pytaniami i kolejnym krokiem.",
  sending: "Wysyłamy zgłoszenie...",
  error: "Nie udało się wysłać formularza. Spróbuj ponownie albo napisz do nas bezpośrednio przez WhatsApp lub Telegram.",
  validationName: "Wpisz imię od 2 do 80 znaków.",
  validationContact: "Wpisz kontakt od 3 do 120 znaków: e-mail, telefon, Telegram albo WhatsApp.",
  validationProject: "Wybierz typ projektu.",
  validationBudget: "Wybierz orientacyjny budżet.",
  validationDeadline: "Wybierz termin.",
  validationDomain: "Wybierz informację o domenie.",
  validationMessage: "Opisz projekt: minimum 10 znaków, maksimum 2000.",
  validationTurnstile: "Potwierdź, że nie jesteś botem."
};

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-links a");
const portfolioGrid = document.getElementById("portfolio-grid");
const portfolioModal = document.getElementById("portfolio-modal");
const portfolioModalPanel = portfolioModal ? portfolioModal.querySelector(".portfolio-modal-panel") : null;
const portfolioModalContent = document.getElementById("portfolio-modal-content");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const messageCounter = document.getElementById("message-counter");
const trackedSections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
let lastFocusedElement = null;

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[character]));

const setHeaderState = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
};

const closeMobileMenu = () => {
  if (!mobileMenu || !menuToggle) {
    return;
  }

  mobileMenu.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Otwórz menu");
};

const toggleMobileMenu = () => {
  if (!mobileMenu || !menuToggle) {
    return;
  }

  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
};

const getProject = (projectId) => portfolioProjects.find((project) => project.id === projectId);

const hasProjectUrl = (project) => project.url && project.url !== "#";

const renderFeatureList = (items) => items
  .map((item) => `<li>${escapeHtml(item)}</li>`)
  .join("");

const renderPortfolio = () => {
  if (!portfolioGrid) {
    return;
  }

  portfolioGrid.innerHTML = portfolioProjects.map((project) => `
    <article class="portfolio-card reveal">
      <div class="project-media">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" width="640" height="400">
      </div>
      <div class="card-body">
        <div class="portfolio-tags">
          <span class="project-tag project-tag-${escapeHtml(project.accent)}">${escapeHtml(project.status)}</span>
          <span class="project-tag">${escapeHtml(project.type)}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <ul class="portfolio-points">${renderFeatureList(project.features)}</ul>
        <div class="portfolio-actions">
          ${hasProjectUrl(project) ? `<a class="button button-secondary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener" aria-label="Zobacz projekt ${escapeHtml(project.title)}">Zobacz projekt</a>` : ""}
          <button class="button button-primary" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="Zobacz szczegóły projektu ${escapeHtml(project.title)}">Szczegóły</button>
        </div>
      </div>
    </article>
  `).join("");

  portfolioGrid.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => openPortfolioModal(button.dataset.projectId));
  });

  prepareRevealElements(portfolioGrid.querySelectorAll(".reveal"));
};

const openPortfolioModal = (projectId) => {
  const project = getProject(projectId);

  if (!project || !portfolioModal || !portfolioModalPanel || !portfolioModalContent) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  portfolioModalContent.innerHTML = `
    <div class="portfolio-modal-media">
      <img src="${escapeHtml(project.fullImage)}" alt="${escapeHtml(project.imageAlt)}" width="900" height="1200">
    </div>
    <div class="portfolio-modal-body">
      <div class="portfolio-tags">
        <span class="project-tag project-tag-${escapeHtml(project.accent)}">${escapeHtml(project.status)}</span>
        <span class="project-tag">${escapeHtml(project.type)}</span>
      </div>
      <h3 id="portfolio-modal-title">${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <div class="modal-block">
        <h4>Cel projektu</h4>
        <p>${escapeHtml(project.details)}</p>
      </div>
      <div class="modal-lists">
        <div class="modal-block">
          <h4>Funkcje</h4>
          <ul class="feature-list">${renderFeatureList(project.features)}</ul>
        </div>
        <div class="modal-block">
          <h4>Zakres do dopasowania</h4>
          <p>Treści, zdjęcia, link do projektu, integracje i dodatkowe sekcje są dopasowywane do realnej firmy przed publikacją.</p>
        </div>
      </div>
      <div class="portfolio-actions">
        ${hasProjectUrl(project) ? `<a class="button button-secondary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener">Zobacz projekt</a>` : ""}
        <a class="button button-primary" href="#contacts" data-portfolio-close>Omów podobny projekt</a>
      </div>
    </div>
  `;

  portfolioModal.hidden = false;
  document.body.classList.add("modal-open");
  portfolioModalPanel.focus({ preventScroll: true });
};

const closePortfolioModal = () => {
  if (!portfolioModal || portfolioModal.hidden) {
    return;
  }

  portfolioModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
};

const prepareRevealElements = (elements) => {
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(element);
  });
};

const setFormStatus = (message, isError = false) => {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove("hidden");
  formStatus.classList.toggle("is-error", isError);
};

const getField = (name) => (form ? form.elements.namedItem(name) : null);

const getValue = (name) => {
  const field = getField(name);
  return field && "value" in field ? String(field.value).trim() : "";
};

const getFieldWrapper = (name) => {
  const field = getField(name);
  return field instanceof HTMLElement ? field.closest("label") : null;
};

const setFieldError = (name, message) => {
  if (!form) {
    return;
  }

  const error = form.querySelector(`[data-error-for="${name}"]`);
  const wrapper = getFieldWrapper(name);

  if (error) {
    error.textContent = message;
  }

  if (wrapper) {
    wrapper.classList.add("form-field-invalid");
    wrapper.classList.remove("form-field-valid");
  }
};

const clearFieldError = (name) => {
  if (!form) {
    return;
  }

  const error = form.querySelector(`[data-error-for="${name}"]`);
  const wrapper = getFieldWrapper(name);

  if (error) {
    error.textContent = "";
  }

  if (wrapper) {
    wrapper.classList.remove("form-field-invalid");
    wrapper.classList.add("form-field-valid");
  }
};

const rules = {
  name: {
    validate: (value) => value.length >= 2 && value.length <= 80,
    message: messages.validationName
  },
  contact: {
    validate: (value) => value.length >= 3 && value.length <= 120,
    message: messages.validationContact
  },
  project: {
    validate: (value) => value.length > 0 && value.length <= 120,
    message: messages.validationProject
  },
  budget: {
    validate: (value) => value.length > 0 && value.length <= 80,
    message: messages.validationBudget
  },
  deadline: {
    validate: (value) => value.length > 0 && value.length <= 80,
    message: messages.validationDeadline
  },
  domain: {
    validate: (value) => value.length > 0 && value.length <= 40,
    message: messages.validationDomain
  },
  message: {
    validate: (value) => value.length >= 10 && value.length <= 2000,
    message: messages.validationMessage
  }
};

const validateField = (name) => {
  const rule = rules[name];

  if (!rule) {
    return true;
  }

  const isValid = rule.validate(getValue(name));

  if (!isValid) {
    setFieldError(name, rule.message);
    return false;
  }

  clearFieldError(name);
  return true;
};

const hasTurnstileResponse = () => Boolean(getValue("cf-turnstile-response"));

const isTurnstileRequired = () => Boolean(form && form.querySelector(".cf-turnstile") && window.location.protocol !== "file:");

const validateForm = () => {
  let isValid = true;

  Object.keys(rules).forEach((name) => {
    if (!validateField(name)) {
      isValid = false;
    }
  });

  if (isTurnstileRequired() && !hasTurnstileResponse()) {
    setFormStatus(messages.validationTurnstile, true);
    return false;
  }

  if (!isValid) {
    setFormStatus(messages.error, true);
  }

  return isValid;
};

const updateMessageCounter = () => {
  if (messageCounter) {
    messageCounter.textContent = `${getValue("message").length}/2000`;
  }
};

const resetFormState = () => {
  if (!form) {
    return;
  }

  form.querySelectorAll("[data-error-for]").forEach((error) => {
    error.textContent = "";
  });

  form.querySelectorAll(".form-field-invalid, .form-field-valid").forEach((wrapper) => {
    wrapper.classList.remove("form-field-invalid", "form-field-valid");
  });
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (!form) {
    return;
  }

  if (!validateForm()) {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  setFormStatus(messages.sending);

  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    if (window.location.protocol !== "file:") {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Contact request failed");
      }
    }

    form.reset();
    resetFormState();
    updateMessageCounter();
    setFormStatus(messages.success);

    if (window.turnstile) {
      window.turnstile.reset();
    }
  } catch (error) {
    console.error("Contact form error:", error);
    setFormStatus(messages.error, true);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
};

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if ("IntersectionObserver" in window && trackedSections.length) {
  const activeSectionObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) {
      return;
    }

    const activeId = visibleEntry.target.id;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  }, {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.12, 0.28, 0.5]
  });

  trackedSections.forEach((section) => activeSectionObserver.observe(section));
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

if (portfolioModal) {
  portfolioModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-portfolio-close]")) {
      closePortfolioModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePortfolioModal();
    closeMobileMenu();
  }
});

if (form) {
  Object.keys(rules).forEach((name) => {
    const field = getField(name);

    if (!field) {
      return;
    }

    field.addEventListener(field.tagName === "SELECT" ? "change" : "input", () => {
      validateField(name);

      if (name === "message") {
        updateMessageCounter();
      }
    });
  });

  form.addEventListener("submit", handleFormSubmit);
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

renderPortfolio();
prepareRevealElements(document.querySelectorAll(".reveal"));
updateMessageCounter();
