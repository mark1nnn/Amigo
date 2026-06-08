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

const portfolioUi = {
  pl: {
    detailsLabel: "Zobacz projekt",
    featuresLabel: "Najważniejsze elementy",
    goalLabel: "Cel projektu",
    bestForLabel: "Dla kogo",
    closeLabel: "Zamknij okno projektu",
    placeholderLabel: "Podgląd wkrótce",
    emptyLabel: "Brak projektów dla wybranego filtra."
  },
  en: {
    detailsLabel: "View case",
    featuresLabel: "Key features",
    goalLabel: "Project goal",
    bestForLabel: "Best for",
    closeLabel: "Close project dialog",
    placeholderLabel: "Preview coming soon",
    emptyLabel: "No projects match this filter."
  },
  uk: {
    detailsLabel: "Детальніше",
    featuresLabel: "Ключові елементи",
    goalLabel: "Мета проєкту",
    bestForLabel: "Для кого",
    closeLabel: "Закрити вікно проєкту",
    placeholderLabel: "Превʼю скоро буде додано",
    emptyLabel: "Немає проєктів для цього фільтра."
  }
};

const portfolioProjects = {
  pl: [
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Landing", "Projekt realny"],
      filters: ["landing"],
      thumbnail: "sto-landing-cover.jpg",
      fullImage: "sto-landing-full.jpg",
      imageAlt: "Podgląd strony AutoHouse",
      url: "https://autohouse.dp.ua/",
      shortDescription: "Landing page dla lokalnej firmy z czytelną ofertą, ścieżkami kontaktu i formularzem zapytania.",
      description: "Landing page przygotowany dla lokalnej firmy. Projekt skupia się na czytelnej prezentacji usług, szybkim kontakcie, wersji mobilnej i prostym procesie wysłania zapytania.",
      goal: "Stworzyć czytelny landing page, na którym użytkownik szybko rozumie ofertę i może wysłać zapytanie.",
      features: ["Sekcje usług", "Formularz kontaktowy", "Wyraźne CTA", "Układ mobile-first", "Podstawowe przygotowanie SEO"],
      bestFor: "Lokalne usługi, małe firmy i biznesy, które potrzebują czytelnej prezentacji online.",
      actionLabel: "Otwórz stronę"
    },
    {
      id: "termotrans-multipage",
      title: "Termotrans Multipage Website",
      tags: ["Multipage demo"],
      filters: ["multipage", "demo"],
      thumbnail: "sto-multipage-cover.jpg",
      fullImage: "sto-multipage-full.jpg",
      imageAlt: "Podgląd strony Termotrans Multipage Website",
      url: "https://multipagewebsiteexample.markin4097.workers.dev/",
      shortDescription: "Demo strony wielostronicowej z osobnymi podstronami, czytelną nawigacją i strukturą przyjazną SEO.",
      description: "Demonstracyjna strona wielostronicowa pokazująca, jak firma usługowa może przedstawić ofertę na kilku podstronach. Struktura jest przygotowana pod nawigację, FAQ, kontakt i przyszłe treści.",
      goal: "Pokazać, jak strona firmowa może rozdzielić usługi, informacje o firmie, portfolio i kontakt w czytelnej strukturze.",
      features: ["Kilka podstron", "Strona usług", "Strona o firmie", "Strona kontaktowa", "Struktura przyjazna SEO", "Układ przygotowany pod FAQ"],
      bestFor: "Firmy, które potrzebują więcej niż jednej strony, osobnych opisów usług i miejsca na przyszłe treści SEO.",
      actionLabel: "Otwórz demo"
    },
    {
      id: "termotrans-landing",
      title: "Termotrans Landing Website",
      tags: ["Landing demo"],
      filters: ["landing", "demo"],
      thumbnail: "",
      fullImage: "",
      imageAlt: "Placeholder podglądu Termotrans Landing Website",
      url: "https://landingwebsite.markin4097.workers.dev/",
      shortDescription: "Demo jednostronicowego landing page z naciskiem na ofertę, korzyści, proces i kontakt.",
      description: "Demonstracyjny landing page dla firmy usługowej, która potrzebuje szybkiej i czytelnej obecności online. Układ skupia się na pierwszym ekranie, prezentacji oferty, sekcjach zaufania, procesie i formularzu kontaktowym.",
      goal: "Pokazać, jak strona one-page może jasno przedstawić ofertę i poprowadzić użytkownika do kontaktu.",
      features: ["Struktura one-page", "Sekcja hero", "Usługi i korzyści", "Sekcja procesu", "Formularz kontaktowy", "Responsywny układ"],
      bestFor: "Małe firmy, pojedyncze usługi, szybkie starty i kampanie reklamowe.",
      actionLabel: "Otwórz demo"
    }
  ],
  en: [
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Landing", "Real project"],
      filters: ["landing"],
      thumbnail: "sto-landing-cover.jpg",
      fullImage: "sto-landing-full.jpg",
      imageAlt: "AutoHouse website preview",
      url: "https://autohouse.dp.ua/",
      shortDescription: "Landing page for a local business with clear services, contact paths and an inquiry form.",
      description: "A landing page created for a local business. The project focuses on clear service presentation, fast contact, mobile-first layout and a simple inquiry flow.",
      goal: "Create a clear landing page where visitors can quickly understand the offer and send an inquiry.",
      features: ["Service sections", "Contact form", "Clear CTA buttons", "Mobile-first layout", "Basic SEO preparation"],
      bestFor: "Local services, small businesses and companies that need a clear online presentation.",
      actionLabel: "Open website"
    },
    {
      id: "termotrans-multipage",
      title: "Termotrans Multipage Website",
      tags: ["Multipage demo"],
      filters: ["multipage", "demo"],
      thumbnail: "sto-multipage-cover.jpg",
      fullImage: "sto-multipage-full.jpg",
      imageAlt: "Termotrans multipage website preview",
      url: "https://multipagewebsiteexample.markin4097.workers.dev/",
      shortDescription: "Demo multipage website with separate pages, clear navigation and SEO-friendly structure.",
      description: "A demonstration multipage website showing how a service business can present its offer across several pages. The structure is prepared for navigation, FAQ, contact and future content growth.",
      goal: "Show how a business website can separate services, company information, portfolio and contact into a clear page structure.",
      features: ["Multiple pages", "Services page", "About page", "Contact page", "SEO-friendly structure", "FAQ-ready layout"],
      bestFor: "Companies that need more than one page, separate service descriptions and room for future SEO content.",
      actionLabel: "Open demo"
    },
    {
      id: "termotrans-landing",
      title: "Termotrans Landing Website",
      tags: ["Landing demo"],
      filters: ["landing", "demo"],
      thumbnail: "",
      fullImage: "",
      imageAlt: "Placeholder preview for Termotrans Landing Website",
      url: "https://landingwebsite.markin4097.workers.dev/",
      shortDescription: "Demo one-page landing page for a service business focused on offer, benefits, process and contact.",
      description: "A demonstration landing page for a service business that needs a quick and clear online presence. The layout focuses on the first screen, offer presentation, trust sections, process and contact form.",
      goal: "Show how a one-page website can present an offer clearly and guide the visitor to contact.",
      features: ["One-page structure", "Hero section", "Services and benefits", "Process section", "Contact form", "Mobile-friendly layout"],
      bestFor: "Small businesses, single services, quick launches and advertising campaigns.",
      actionLabel: "Open demo"
    }
  ],
  uk: [
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Landing", "Реальний проєкт"],
      filters: ["landing"],
      thumbnail: "sto-landing-cover.jpg",
      fullImage: "sto-landing-full.jpg",
      imageAlt: "Preview сайту AutoHouse",
      url: "https://autohouse.dp.ua/",
      shortDescription: "Landing page для локального бізнесу з чіткою пропозицією, шляхами до контакту та формою заявки.",
      description: "Landing page для локального бізнесу. Проєкт зосереджений на зрозумілій презентації послуг, швидкому контакті, мобільній версії та простому шляху до заявки.",
      goal: "Створити зрозумілий landing page, де відвідувач швидко бачить пропозицію та може залишити заявку.",
      features: ["Секції послуг", "Контактна форма", "Помітні CTA-кнопки", "Mobile-first структура", "Базова SEO-підготовка"],
      bestFor: "Локальні послуги, малий бізнес і компанії, яким потрібна зрозуміла онлайн-презентація.",
      actionLabel: "Відкрити сайт"
    },
    {
      id: "termotrans-multipage",
      title: "Termotrans Multipage Website",
      tags: ["Multipage demo"],
      filters: ["multipage", "demo"],
      thumbnail: "sto-multipage-cover.jpg",
      fullImage: "sto-multipage-full.jpg",
      imageAlt: "Preview сайту Termotrans Multipage Website",
      url: "https://multipagewebsiteexample.markin4097.workers.dev/",
      shortDescription: "Демо багатосторінкового сайту з окремими сторінками, зрозумілою навігацією та SEO-friendly структурою.",
      description: "Демонстраційний багатосторінковий сайт, який показує, як бізнес у сфері послуг може презентувати пропозицію на кількох сторінках. Структура підготовлена для навігації, FAQ, контактів і майбутнього контенту.",
      goal: "Показати, як сайт компанії може розділити послуги, інформацію про бізнес, портфоліо та контакти в зрозумілій структурі.",
      features: ["Кілька сторінок", "Сторінка послуг", "Сторінка про компанію", "Контактна сторінка", "SEO-friendly структура", "Макет під FAQ"],
      bestFor: "Компанії, яким потрібно більше ніж одна сторінка, окремі описи послуг і місце для майбутнього SEO-контенту.",
      actionLabel: "Відкрити демо"
    },
    {
      id: "termotrans-landing",
      title: "Termotrans Landing Website",
      tags: ["Landing demo"],
      filters: ["landing", "demo"],
      thumbnail: "",
      fullImage: "",
      imageAlt: "Placeholder preview для Termotrans Landing Website",
      url: "https://landingwebsite.markin4097.workers.dev/",
      shortDescription: "Демо односторінкового landing page для бізнесу у сфері послуг з акцентом на пропозицію, переваги, процес і контакт.",
      description: "Демонстраційний landing page для бізнесу у сфері послуг, якому потрібна швидка й зрозуміла онлайн-презентація. Макет зосереджений на першому екрані, послугах, блоках довіри, процесі роботи та контактній формі.",
      goal: "Показати, як one-page сайт може зрозуміло презентувати пропозицію та привести відвідувача до контакту.",
      features: ["One-page структура", "Hero-секція", "Послуги та переваги", "Секція процесу", "Контактна форма", "Адаптивний макет"],
      bestFor: "Малий бізнес, окремі послуги, швидкий запуск і рекламні кампанії.",
      actionLabel: "Відкрити демо"
    }
  ]
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

const portfolioGrids = document.querySelectorAll("[data-portfolio-grid]");
let portfolioModal = null;
let portfolioModalDialog = null;
let portfolioModalCloseButton = null;
let portfolioModalActiveTrigger = null;

const getPortfolioLanguage = () => document.body.dataset.language || "pl";
const getPortfolioUi = () => portfolioUi[getPortfolioLanguage()] || portfolioUi.pl;
const getPortfolioProjects = () => portfolioProjects[getPortfolioLanguage()] || portfolioProjects.pl;
const getPortfolioAssetBase = () => (getPortfolioLanguage() === "pl" ? "assets/portfolio/" : "../assets/portfolio/");
const getPortfolioContactPath = (projectId) => {
  const basePath = getPortfolioLanguage() === "pl" ? "/contact" : `/${getPortfolioLanguage()}/contact`;
  return `${basePath}?project=${encodeURIComponent(projectId)}`;
};

const renderPortfolioImage = (project, extraClass = "") => {
  const classes = ["project-media", extraClass].filter(Boolean).join(" ");
  if (project.thumbnail) {
    return `<div class="${classes}"><img src="${getPortfolioAssetBase()}${project.thumbnail}" alt="${project.imageAlt}" width="720" height="450" loading="lazy"></div>`;
  }
  return `<div class="${classes} project-media-placeholder"><span>${getPortfolioUi().placeholderLabel}</span></div>`;
};

const renderPortfolioModalImage = (project) => {
  if (project.fullImage) {
    return `<img src="${getPortfolioAssetBase()}${project.fullImage}" alt="${project.imageAlt}" width="1440" height="1800" loading="lazy">`;
  }
  return `<div class="portfolio-modal__placeholder">${getPortfolioUi().placeholderLabel}</div>`;
};

const renderPortfolioCard = (project) => `
  <article class="portfolio-card portfolio-card-compact" data-project-id="${project.id}" data-project-filters="${project.filters.join(" ")}" tabindex="0" role="button" aria-haspopup="dialog">
    ${renderPortfolioImage(project, "portfolio-card__image")}
    <div class="card-body portfolio-card__body">
      <div class="portfolio-tags portfolio-card__tags">
        ${project.tags.map((tag, index) => `<span class="project-tag ${index === 0 ? "project-tag-blue" : "project-tag-muted"}">${tag}</span>`).join("")}
      </div>
      <h2>${project.title}</h2>
      <p>${project.shortDescription}</p>
      <span class="portfolio-card__hint">${getPortfolioUi().detailsLabel}</span>
    </div>
  </article>
`;

const ensurePortfolioModal = () => {
  if (portfolioModal) return;

  const ui = getPortfolioUi();
  portfolioModal = document.createElement("div");
  portfolioModal.className = "portfolio-modal";
  portfolioModal.hidden = true;
  portfolioModal.innerHTML = `
    <div class="portfolio-modal__overlay" data-portfolio-close="overlay"></div>
    <div class="portfolio-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title" tabindex="-1">
      <button type="button" class="portfolio-modal__close" data-portfolio-close="button" aria-label="${ui.closeLabel}">×</button>
      <div class="portfolio-modal__layout">
        <div class="portfolio-modal__media" data-portfolio-modal-image></div>
        <div class="portfolio-modal__content">
          <div class="portfolio-tags portfolio-modal__tags" data-portfolio-modal-tags></div>
          <h2 id="portfolio-modal-title" data-portfolio-modal-title></h2>
          <p class="portfolio-modal__description" data-portfolio-modal-description></p>
          <div class="portfolio-modal__meta">
            <h3>${ui.goalLabel}</h3>
            <p data-portfolio-modal-goal></p>
          </div>
          <div class="portfolio-modal__features">
            <h3>${ui.featuresLabel}</h3>
            <ul class="feature-list portfolio-modal__feature-list" data-portfolio-modal-features></ul>
          </div>
          <div class="portfolio-modal__meta">
            <h3>${ui.bestForLabel}</h3>
            <p data-portfolio-modal-best-for></p>
          </div>
          <div class="portfolio-modal__actions">
            <a href="/" class="button button-primary portfolio-modal__action" data-portfolio-modal-link target="_blank" rel="noopener"></a>
            <a href="/" class="button button-ghost portfolio-modal__action portfolio-modal__action-secondary" data-portfolio-modal-contact></a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(portfolioModal);
  portfolioModalDialog = portfolioModal.querySelector(".portfolio-modal__dialog");
  portfolioModalCloseButton = portfolioModal.querySelector(".portfolio-modal__close");

  portfolioModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.portfolioClose) {
      closePortfolioModal();
    }
  });
};

const closePortfolioModal = () => {
  if (!portfolioModal || portfolioModal.hidden) return;
  portfolioModal.hidden = true;
  document.body.classList.remove("modal-open");
  if (portfolioModalActiveTrigger instanceof HTMLElement) {
    portfolioModalActiveTrigger.focus();
  }
  portfolioModalActiveTrigger = null;
};

const openPortfolioModal = (project, trigger) => {
  ensurePortfolioModal();
  const tags = portfolioModal.querySelector("[data-portfolio-modal-tags]");
  const title = portfolioModal.querySelector("[data-portfolio-modal-title]");
  const description = portfolioModal.querySelector("[data-portfolio-modal-description]");
  const goal = portfolioModal.querySelector("[data-portfolio-modal-goal]");
  const image = portfolioModal.querySelector("[data-portfolio-modal-image]");
  const features = portfolioModal.querySelector("[data-portfolio-modal-features]");
  const bestFor = portfolioModal.querySelector("[data-portfolio-modal-best-for]");
  const link = portfolioModal.querySelector("[data-portfolio-modal-link]");
  const contact = portfolioModal.querySelector("[data-portfolio-modal-contact]");

  if (!tags || !title || !description || !goal || !image || !features || !bestFor || !link || !contact) return;

  tags.innerHTML = project.tags.map((tag, index) => `<span class="project-tag ${index === 0 ? "project-tag-blue" : "project-tag-muted"}">${tag}</span>`).join("");
  title.textContent = project.title;
  description.textContent = project.description;
  goal.textContent = project.goal;
  image.innerHTML = renderPortfolioModalImage(project);
  features.innerHTML = project.features.map((feature) => `<li><i data-lucide="check" class="icon icon-check"></i><span>${feature}</span></li>`).join("");
  bestFor.textContent = project.bestFor;
  link.href = project.url;
  link.textContent = project.actionLabel;
  contact.href = getPortfolioContactPath(project.id);
  contact.textContent = getPortfolioLanguage() === "pl"
    ? "Chcę podobny projekt"
    : getPortfolioLanguage() === "uk"
      ? "Хочу схожий сайт"
      : "I want a similar website";

  portfolioModal.hidden = false;
  document.body.classList.add("modal-open");
  portfolioModalActiveTrigger = trigger;
  refreshIcons();
  requestAnimationFrame(() => {
    if (portfolioModalCloseButton) portfolioModalCloseButton.focus();
  });
};

const bindPortfolioCards = (grid, projectMap) => {
  grid.querySelectorAll("[data-project-id]").forEach((card) => {
    const open = () => {
      const projectId = card.getAttribute("data-project-id");
      if (!projectId || !projectMap.has(projectId)) return;
      openPortfolioModal(projectMap.get(projectId), card);
    };

    card.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.closest("a")) return;
      open();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
};

const renderPortfolioSection = (grid, projects, filter = "all") => {
  const ui = getPortfolioUi();
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.filters.includes(filter));
  if (!visibleProjects.length) {
    grid.innerHTML = `<p class="portfolio-empty">${ui.emptyLabel}</p>`;
    return new Map();
  }
  grid.innerHTML = visibleProjects.map((project) => renderPortfolioCard(project)).join("");
  const projectMap = new Map(visibleProjects.map((project) => [project.id, project]));
  bindPortfolioCards(grid, projectMap);
  return projectMap;
};

const initPortfolioSections = () => {
  if (!portfolioGrids.length) return;

  const projects = getPortfolioProjects();

  portfolioGrids.forEach((grid) => {
    const view = grid.getAttribute("data-portfolio-view") || "home";
    const availableProjects = view === "home" ? projects.slice(0, 3) : projects;
    renderPortfolioSection(grid, availableProjects);

    if (view !== "portfolio") return;

    const filterBar = grid.parentElement?.querySelector(".portfolio-filter-bar");
    const filterButtons = filterBar ? [...filterBar.querySelectorAll("[data-portfolio-filter]")] : [];
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-portfolio-filter") || "all";
        filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        renderPortfolioSection(grid, availableProjects, filter);
      });
    });
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

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    closeLanguageMenus(menu);
  });

  menu.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", () => {
      closeLanguageMenus();
    });
  });
});

document.addEventListener("click", (event) => {
  if (![...languageMenus].some((menu) => menu.contains(event.target))) {
    closeLanguageMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (!portfolioModal?.hidden && event.key === "Tab" && portfolioModalDialog) {
    const focusable = [...portfolioModalDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    if (focusable.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  if (event.key === "Escape") {
    if (mobileMenu) {
      mobileMenu.classList.remove("is-open");
      renderMenuButton();
    }
    closeLanguageMenus();
    closePortfolioModal();
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

initPortfolioSections();
refreshIcons();
renderMenuButton();
