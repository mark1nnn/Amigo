document.documentElement.classList.add("js");

const REVIEW_REVEAL_THRESHOLD = 0.15;
const REVIEW_PARALLAX_MAX = 10;
const REVIEW_MOBILE_BREAKPOINT = 768;

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
  "languages": '<path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path>',
  "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
  "layout-template": '<rect width="18" height="7" x="3" y="3" rx="1"></rect><rect width="9" height="7" x="3" y="14" rx="1"></rect><rect width="5" height="7" x="16" y="14" rx="1"></rect>',
  "menu": '<line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line>',
  "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
  "message-circle-more": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path><path d="M8 12h.01"></path><path d="M12 12h.01"></path><path d="M16 12h.01"></path>',
  "message-square-text": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13 8H7"></path><path d="M17 12H7"></path>',
  "messages-square": '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>',
  "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path>',
  "panels-top-left": '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path>',
  "search": '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
  "send": '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
  "send-horizontal": '<path d="m3 3 3 9-3 9 19-9Z"></path><path d="M6 12h16"></path>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>',
  "smartphone": '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path>',
  "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>',
  "x": '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>'
};

const reviewsData = [
  // Do not publish fake reviews.
  // Add real client reviews only after approval and permission to publish.
  {
    id: "autohouse-serhii-pl",
    status: "published",
    lang: "pl",
    name: "Serhii",
    company: "Autohouse.Dnepr",
    projectName: "Landing page dla serwisu samochodowego",
    projectType: "Landing page",
    websiteUrl: "https://autohouse.dp.ua/",
    rating: "5 out of 5",
    ratingLabel: "Ocena: 5 na 5",
    initial: "S",
    text: "Bardzo podobała mi się komunikacja, termin realizacji, cena oraz oczywiście sam efekt wykonanej pracy.",
    permissionToPublish: true
  },
  {
    id: "autohouse-serhii-en",
    status: "published",
    lang: "en",
    name: "Serhii",
    company: "Autohouse.Dnepr",
    projectName: "Landing page for an auto service",
    projectType: "Landing page",
    websiteUrl: "https://autohouse.dp.ua/",
    rating: "5 out of 5",
    ratingLabel: "Rating: 5 out of 5",
    initial: "S",
    text: "I was very pleased with the communication, delivery time, price and, of course, the final result.",
    permissionToPublish: true
  },
  {
    id: "autohouse-serhii-uk",
    status: "published",
    lang: "uk",
    name: "Сергій",
    company: "Autohouse.Dnepr",
    projectName: "Лендинг для СТО",
    projectType: "Лендинг",
    websiteUrl: "https://autohouse.dp.ua/",
    rating: "5 out of 5",
    ratingLabel: "Оцінка: 5 із 5",
    initial: "С",
    text: "Дуже сподобалися спілкування, терміни виконання, вартість роботи і, звичайно, сам результат.",
    permissionToPublish: true
  },
  // Example pending structure for future use:
  // {
  //   id: "autohouse",
  //   status: "pending",
  //   lang: "uk",
  //   name: "",
  //   company: "AutoHouse",
  //   projectName: "AutoHouse",
  //   projectType: "Landing Page",
  //   websiteUrl: "https://autohouse.dp.ua/",
  //   rating: null,
  //   text: "",
  //   verified: true,
  //   permissionToPublish: false,
  //   date: ""
  // }
];

const reviewUi = {
  pl: {
    verified: "Zweryfikowany klient",
    projectLink: "Zobacz projekt",
    rating: "Ocena",
    sourceLabel: "Formularz Amigo",
    fallbackName: "Klient Amigo"
  },
  en: {
    verified: "Verified client",
    projectLink: "View project",
    rating: "Rating",
    sourceLabel: "Amigo form",
    fallbackName: "Amigo client"
  },
  uk: {
    sourceLabel: "Форма Amigo",
    fallbackName: "\u041a\u043b\u0456\u0454\u043d\u0442 Amigo",
    verified: "Перевірений клієнт",
    projectLink: "Переглянути проєкт",
    rating: "Оцінка"
  }
};

const portfolioUi = {
  pl: {
    detailsLabel: "Zobacz projekt",
    featuresLabel: "Najważniejsze elementy",
    goalLabel: "Cel projektu",
    technologyLabel: "Technologia",
    bestForLabel: "Dla kogo",
    closeLabel: "Zamknij okno projektu",
    placeholderLabel: "Podgląd wkrótce",
    emptyLabel: "Brak projektów dla wybranego filtra."
  },
  en: {
    detailsLabel: "View project",
    featuresLabel: "Key features",
    goalLabel: "Project goal",
    technologyLabel: "Technology",
    bestForLabel: "Best for",
    closeLabel: "Close project dialog",
    placeholderLabel: "Preview coming soon",
    emptyLabel: "No projects match this filter."
  },
  uk: {
    detailsLabel: "Переглянути проєкт",
    featuresLabel: "Ключові елементи",
    goalLabel: "Мета проєкту",
    technologyLabel: "Технології",
    bestForLabel: "Для кого",
    closeLabel: "Закрити вікно проєкту",
    placeholderLabel: "Превʼю скоро буде додано",
    emptyLabel: "Немає проєктів для цього фільтра."
  }
};

const portfolioProjects = {
  pl: [
    {
      id: "1sto-dnipro-tir",
      title: "1 СТО Dnipro TIR",
      tags: ["Strona wielostronicowa", "Projekt realny"],
      filters: ["multipage", "real"],
      thumbnail: "portfolio-1sto-dnipro-tir-card.webp",
      fullImage: "portfolio-1sto-dnipro-tir-modal.webp",
      imageAlt: "Podgląd strony 1 СТО Dnipro TIR — serwis samochodów ciężarowych w Dnieprze",
      url: "https://1stodniprotir.com.ua/",
      shortDescription: "Wielostronicowa strona dla serwisu samochodów ciężarowych w Dnieprze. Prezentuje usługi naprawy ciężarówek, pomoc wyjazdową, części DAF Euro 2 oraz szybkie kanały kontaktu.",
      description: "Statyczna, wielostronicowa strona internetowa dla serwisu samochodów ciężarowych w Dnieprze. Projekt przedstawia firmę zajmującą się naprawą ciężarówek, ciągników siodłowych, przyczep i naczep, wyjazdową pomocą techniczną oraz obsługą zapytań o części do DAF Euro 2.",
      goalLabel: "Cel projektu",
      goal: "Celem było stworzenie czytelnej strony, która szybko przedstawia zakres usług, pokazuje najważniejsze dane kontaktowe i prowadzi użytkownika do telefonu, Vibera lub Instagram Direct.",
      featuresLabel: "Najważniejsze elementy",
      features: ["responsywny interfejs wielostronicowy", "wersja desktopowa i mobilna", "sticky header i mobilne menu", "centralna konfiguracja danych kontaktowych", "szybkie przyciski telefonu i Vibera", "warunkowe wyświetlanie Instagram Direct", "galeria prawdziwych zdjęć z lightboxem", "sekcja FAQ", "osobna sekcja dotycząca części DAF Euro 2", "przygotowanie techniczne pod lokalne SEO", "sitemap.xml, robots.txt, canonical i JSON-LD"],
      technologyLabel: "Technologia",
      technology: "Czysty HTML, CSS i JavaScript ES Modules. Bez frameworków i bez procesu bundlowania.",
      bestForLabel: "Strona pomaga firmie",
      bestFor: ["prezentować specjalistyczny serwis dla pojazdów ciężarowych", "zbierać zapytania dotyczące napraw i pomocy wyjazdowej", "przedstawiać rzeczywiste kierunki prac", "pozyskiwać zapytania o części DAF Euro 2", "rozwijać lokalną widoczność w Dnieprze i regionie"],
      actionLabel: "Otwórz stronę"
    },
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Landing page", "Projekt realny"],
      filters: ["landing", "real"],
      thumbnail: "portfolio-autohouse-card.webp",
      fullImage: "portfolio-autohouse-modal.webp",
      imageAlt: "Preview of AutoHouse landing page project",
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
      tags: ["Strona wielostronicowa", "Projekt demo"],
      filters: ["multipage", "demo"],
      thumbnail: "portfolio-termotrans-multipage-card.webp",
      fullImage: "portfolio-termotrans-multipage-modal.webp",
      imageAlt: "Preview of Termotrans multipage website demo",
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
      tags: ["Landing page", "Projekt demo"],
      filters: ["landing", "demo"],
      thumbnail: "portfolio-termotrans-landing-card.webp",
      fullImage: "portfolio-termotrans-landing-modal.webp",
      imageAlt: "Preview of Termotrans landing page demo",
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
      id: "1sto-dnipro-tir",
      title: "1 STO Dnipro TIR",
      tags: ["Multipage website", "Real project"],
      filters: ["multipage", "real"],
      thumbnail: "portfolio-1sto-dnipro-tir-card.webp",
      fullImage: "portfolio-1sto-dnipro-tir-modal.webp",
      imageAlt: "Preview of the 1 STO Dnipro TIR commercial truck service website",
      url: "https://1stodniprotir.com.ua/",
      shortDescription: "A multipage website for a commercial truck repair service in Dnipro. It presents truck repair services, roadside assistance, DAF Euro 2 parts and fast contact options.",
      description: "A static multipage website for a commercial truck repair service in Dnipro. The project presents a company that repairs trucks, tractor units, trailers and semi-trailers, provides roadside technical assistance and handles enquiries for DAF Euro 2 parts.",
      goalLabel: "Project goal",
      goal: "The goal was to create a clear website that quickly presents the service range, displays the most important contact details and guides visitors towards a phone call, Viber or Instagram Direct.",
      featuresLabel: "Key features",
      features: ["responsive multipage interface", "desktop and mobile layouts", "sticky header and mobile navigation", "centrally configured contact information", "quick phone and Viber actions", "conditional Instagram Direct display", "real-photo gallery with lightbox", "FAQ accordion", "dedicated DAF Euro 2 parts section", "technical preparation for local SEO", "sitemap.xml, robots.txt, canonical tags and JSON-LD"],
      technologyLabel: "Technology",
      technology: "Vanilla HTML, CSS and JavaScript ES Modules, without frameworks or a bundling process.",
      bestForLabel: "The website helps the business",
      bestFor: ["present a specialist commercial vehicle service", "collect truck repair and roadside assistance enquiries", "show real service areas and workshop photos", "provide a dedicated entry point for DAF Euro 2 parts", "develop local search visibility in Dnipro and the surrounding region"],
      actionLabel: "Open website"
    },
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Landing page", "Real project"],
      filters: ["landing", "real"],
      thumbnail: "portfolio-autohouse-card.webp",
      fullImage: "portfolio-autohouse-modal.webp",
      imageAlt: "Preview of AutoHouse landing page project",
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
      tags: ["Multipage website", "Demo project"],
      filters: ["multipage", "demo"],
      thumbnail: "portfolio-termotrans-multipage-card.webp",
      fullImage: "portfolio-termotrans-multipage-modal.webp",
      imageAlt: "Preview of Termotrans multipage website demo",
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
      tags: ["Landing page", "Demo project"],
      filters: ["landing", "demo"],
      thumbnail: "portfolio-termotrans-landing-card.webp",
      fullImage: "portfolio-termotrans-landing-modal.webp",
      imageAlt: "Preview of Termotrans landing page demo",
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
      id: "1sto-dnipro-tir",
      title: "1 СТО Дніпро TIR",
      tags: ["Багатосторінковий сайт", "Реальний проєкт"],
      filters: ["multipage", "real"],
      thumbnail: "portfolio-1sto-dnipro-tir-card.webp",
      fullImage: "portfolio-1sto-dnipro-tir-modal.webp",
      imageAlt: "Попередній перегляд сайту 1 СТО Дніпро TIR — сервісу вантажних автомобілів",
      url: "https://1stodniprotir.com.ua/",
      shortDescription: "Багатосторінковий сайт для сервісу вантажних автомобілів у Дніпрі. Представляє ремонт вантажівок, виїзну технічну допомогу, запчастини DAF Euro 2 та швидкі способи зв’язку.",
      description: "Статичний багатосторінковий сайт для сервісу вантажних автомобілів у Дніпрі. Проєкт представляє компанію, яка ремонтує вантажівки, тягачі, причепи й напівпричепи, надає виїзну технічну допомогу та приймає запити на запчастини DAF Euro 2.",
      goalLabel: "Мета проєкту",
      goal: "Метою було створити зрозумілий сайт, який швидко показує перелік послуг, основні контактні дані та спрямовує користувача до дзвінка, Viber або Instagram Direct.",
      featuresLabel: "Ключові можливості",
      features: ["адаптивний багатосторінковий інтерфейс", "версії для комп’ютерів і мобільних пристроїв", "sticky header і мобільне меню", "централізована конфігурація контактних даних", "кнопки швидкого дзвінка та переходу у Viber", "умовне відображення Instagram Direct", "галерея реальних фотографій із lightbox", "FAQ-акордеон", "окремий розділ для запчастин DAF Euro 2", "технічна підготовка до локального SEO", "sitemap.xml, robots.txt, canonical і JSON-LD"],
      technologyLabel: "Технології",
      technology: "Чисті HTML, CSS і JavaScript ES Modules без фреймворків і процесу збірки.",
      bestForLabel: "Сайт допомагає бізнесу",
      bestFor: ["представляти спеціалізований сервіс вантажної техніки", "збирати звернення щодо ремонту та виїзної допомоги", "показувати реальні напрямки робіт і фотографії", "отримувати окремі запити на запчастини DAF Euro 2", "розвивати локальну видимість у Дніпрі та області"],
      actionLabel: "Відкрити сайт"
    },
    {
      id: "autohouse",
      title: "AutoHouse",
      tags: ["Лендинг", "Реальний проєкт"],
      filters: ["landing", "real"],
      thumbnail: "portfolio-autohouse-card.webp",
      fullImage: "portfolio-autohouse-modal.webp",
      imageAlt: "Preview of AutoHouse landing page project",
      url: "https://autohouse.dp.ua/",
      shortDescription: "Лендинг для локального бізнесу з чіткою пропозицією, шляхами до контакту та формою заявки.",
      description: "Лендинг для локального бізнесу. Проєкт зосереджений на зрозумілій презентації послуг, швидкому контакті, мобільній версії та простому шляху до заявки.",
      goal: "Створити зрозумілий лендинг, де відвідувач швидко бачить пропозицію та може залишити заявку.",
      features: ["Секції послуг", "Контактна форма", "Помітні CTA-кнопки", "Mobile-first структура", "Базова SEO-підготовка"],
      bestFor: "Локальні послуги, малий бізнес і компанії, яким потрібна зрозуміла онлайн-презентація.",
      actionLabel: "Відкрити сайт"
    },
    {
      id: "termotrans-multipage",
      title: "Termotrans Multipage Website",
      tags: ["Багатосторінковий сайт", "Демо-проєкт"],
      filters: ["multipage", "demo"],
      thumbnail: "portfolio-termotrans-multipage-card.webp",
      fullImage: "portfolio-termotrans-multipage-modal.webp",
      imageAlt: "Preview of Termotrans multipage website demo",
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
      tags: ["Лендинг", "Демо-проєкт"],
      filters: ["landing", "demo"],
      thumbnail: "portfolio-termotrans-landing-card.webp",
      fullImage: "portfolio-termotrans-landing-modal.webp",
      imageAlt: "Preview of Termotrans landing page demo",
      url: "https://landingwebsite.markin4097.workers.dev/",
      shortDescription: "Демо односторінкового лендингу для бізнесу у сфері послуг з акцентом на пропозицію, переваги, процес і контакт.",
      description: "Демонстраційний лендинг для бізнесу у сфері послуг, якому потрібна швидка й зрозуміла онлайн-презентація. Макет зосереджений на першому екрані, послугах, блоках довіри, процесі роботи та контактній формі.",
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
const getPortfolioAssetBase = () => "/assets/portfolio/";
const getPortfolioContactPath = (projectId) => {
  const basePath = getPortfolioLanguage() === "pl" ? "/contact" : `/${getPortfolioLanguage()}/contact`;
  return `${basePath}?project=${encodeURIComponent(projectId)}`;
};

const renderPortfolioValue = (value) => {
  if (Array.isArray(value)) {
    return `<ul class="feature-list portfolio-modal__feature-list">${value.map((item) => `<li><i data-lucide="check" class="icon icon-check"></i><span>${escapeMarkup(item)}</span></li>`).join("")}</ul>`;
  }
  return `<p>${escapeMarkup(value || "")}</p>`;
};

const renderPortfolioImage = (project, extraClass = "") => {
  const classes = ["project-media", extraClass].filter(Boolean).join(" ");
  if (project.thumbnail) {
    return `<div class="${classes}"><img src="${getPortfolioAssetBase()}${project.thumbnail}" alt="${project.imageAlt}" width="720" height="405" loading="lazy" decoding="async"></div>`;
  }
  return `<div class="${classes} project-media-placeholder"><span>${getPortfolioUi().placeholderLabel}</span></div>`;
};

const renderPortfolioModalImage = (project) => {
  if (project.fullImage) {
    return `<img src="${getPortfolioAssetBase()}${project.fullImage}" alt="${project.imageAlt}" loading="lazy" decoding="async">`;
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
            <h3 data-portfolio-modal-goal-label>${ui.goalLabel}</h3>
            <p data-portfolio-modal-goal></p>
          </div>
          <div class="portfolio-modal__features">
            <h3 data-portfolio-modal-features-label>${ui.featuresLabel}</h3>
            <ul class="feature-list portfolio-modal__feature-list" data-portfolio-modal-features></ul>
          </div>
          <div class="portfolio-modal__meta" data-portfolio-modal-technology-wrapper hidden>
            <h3 data-portfolio-modal-technology-label>${ui.technologyLabel}</h3>
            <p data-portfolio-modal-technology></p>
          </div>
          <div class="portfolio-modal__meta">
            <h3 data-portfolio-modal-best-for-label>${ui.bestForLabel}</h3>
            <div class="portfolio-modal__rich" data-portfolio-modal-best-for></div>
          </div>
          <div class="portfolio-modal__actions">
            <a href="/" class="button button-primary portfolio-modal__action" data-portfolio-modal-link target="_blank" rel="noopener noreferrer"></a>
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
  const ui = getPortfolioUi();
  const tags = portfolioModal.querySelector("[data-portfolio-modal-tags]");
  const title = portfolioModal.querySelector("[data-portfolio-modal-title]");
  const description = portfolioModal.querySelector("[data-portfolio-modal-description]");
  const goalLabel = portfolioModal.querySelector("[data-portfolio-modal-goal-label]");
  const goal = portfolioModal.querySelector("[data-portfolio-modal-goal]");
  const image = portfolioModal.querySelector("[data-portfolio-modal-image]");
  const featuresLabel = portfolioModal.querySelector("[data-portfolio-modal-features-label]");
  const features = portfolioModal.querySelector("[data-portfolio-modal-features]");
  const technologyWrapper = portfolioModal.querySelector("[data-portfolio-modal-technology-wrapper]");
  const technologyLabel = portfolioModal.querySelector("[data-portfolio-modal-technology-label]");
  const technology = portfolioModal.querySelector("[data-portfolio-modal-technology]");
  const bestForLabel = portfolioModal.querySelector("[data-portfolio-modal-best-for-label]");
  const bestFor = portfolioModal.querySelector("[data-portfolio-modal-best-for]");
  const link = portfolioModal.querySelector("[data-portfolio-modal-link]");
  const contact = portfolioModal.querySelector("[data-portfolio-modal-contact]");

  if (!tags || !title || !description || !goalLabel || !goal || !image || !featuresLabel || !features || !technologyWrapper || !technologyLabel || !technology || !bestForLabel || !bestFor || !link || !contact) return;

  tags.innerHTML = project.tags.map((tag, index) => `<span class="project-tag ${index === 0 ? "project-tag-blue" : "project-tag-muted"}">${tag}</span>`).join("");
  title.textContent = project.title;
  description.textContent = project.description;
  goalLabel.textContent = project.goalLabel || ui.goalLabel;
  goal.textContent = project.goal;
  image.innerHTML = renderPortfolioModalImage(project);
  featuresLabel.textContent = project.featuresLabel || ui.featuresLabel;
  features.innerHTML = project.features.map((feature) => `<li><i data-lucide="check" class="icon icon-check"></i><span>${escapeMarkup(feature)}</span></li>`).join("");
  if (project.technology) {
    technologyWrapper.hidden = false;
    technologyLabel.textContent = project.technologyLabel || ui.technologyLabel;
    technology.textContent = project.technology;
  } else {
    technologyWrapper.hidden = true;
    technology.textContent = "";
  }
  bestForLabel.textContent = project.bestForLabel || ui.bestForLabel;
  bestFor.innerHTML = renderPortfolioValue(project.bestFor);
  link.href = project.url;
  link.rel = "noopener noreferrer";
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

const getChecked = (form, name) => {
  const field = getField(form, name);
  return field instanceof HTMLInputElement && field.type === "checkbox" ? field.checked : false;
};

const contactValidationMessages = {
  pl: {
    name: "Wpisz imię - minimum 2 znaki.",
    contact: "Podaj kontakt: email, Telegram, WhatsApp albo telefon.",
    contactInvalid: "Sprawdź kontakt - możesz podać email, Telegram, WhatsApp albo telefon.",
    projectType: "Wybierz format strony.",
    message: "Krótko opisz projekt.",
    messageShort: "Opisz projekt trochę dokładniej - minimum 20 znaków.",
    messageLong: "Tekst jest zbyt długi. Skróć opis do dozwolonego limitu.",
    turnstile: "Potwierdź weryfikację bezpieczeństwa i spróbuj ponownie."
  },
  en: {
    name: "Enter your name - at least 2 characters.",
    contact: "Enter a contact method: email, Telegram, WhatsApp or phone.",
    contactInvalid: "Check the contact field - you can enter email, Telegram, WhatsApp or phone.",
    projectType: "Choose a website format.",
    message: "Briefly describe the project.",
    messageShort: "Describe the project in a bit more detail - at least 20 characters.",
    messageLong: "The text is too long. Shorten the description to the allowed limit.",
    turnstile: "Complete the security check and try again."
  },
  uk: {
    name: "Вкажіть ім'я - мінімум 2 символи.",
    contact: "Вкажіть контакт: email, Telegram, WhatsApp або телефон.",
    contactInvalid: "Перевірте контакт - можна вказати email, Telegram, WhatsApp або телефон.",
    projectType: "Оберіть формат сайту.",
    message: "Коротко опишіть проєкт.",
    messageShort: "Опишіть проєкт трохи детальніше - мінімум 20 символів.",
    messageLong: "Текст занадто довгий. Скоротіть опис до дозволеного ліміту.",
    turnstile: "Підтвердіть перевірку безпеки та спробуйте ще раз."
  }
};

const reviewValidationMessages = {
  pl: {
    name: "Wpisz imię - minimum 2 znaki.",
    company: "Wpisz nazwę firmy.",
    projectName: "Wpisz nazwę projektu.",
    projectType: "Wpisz typ projektu.",
    reviewText: "Treść opinii powinna mieć od 30 do 1000 znaków.",
    websiteUrl: "Podaj poprawny adres URL strony.",
    permissionToPublish: "Zgoda na publikację opinii jest wymagana.",
    turnstile: "Potwierdź weryfikację bezpieczeństwa i spróbuj ponownie."
  },
  en: {
    name: "Enter your name - at least 2 characters.",
    company: "Enter the company name.",
    projectName: "Enter the project name.",
    projectType: "Enter the project type.",
    reviewText: "Review text must be between 30 and 1000 characters.",
    websiteUrl: "Enter a valid website URL.",
    permissionToPublish: "Permission to publish the review is required.",
    turnstile: "Complete the security check and try again."
  },
  uk: {
    name: "Вкажіть ім'я - мінімум 2 символи.",
    company: "Вкажіть назву компанії.",
    projectName: "Вкажіть назву проєкту.",
    projectType: "Вкажіть тип проєкту.",
    reviewText: "Текст відгуку має містити від 30 до 1000 символів.",
    websiteUrl: "Вкажіть коректний URL сайту.",
    permissionToPublish: "Згода на публікацію відгуку є обов'язковою.",
    turnstile: "Підтвердіть перевірку безпеки та спробуйте ще раз."
  }
};

const getValidationMessage = (form, key) => {
  const language = form.dataset.language || "pl";
  const messages = getValue(form, "formType") === "review" ? reviewValidationMessages : contactValidationMessages;
  return messages[language]?.[key] || messages.pl[key] || "";
};

const isValidUrl = (value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const escapeMarkup = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const isPlausibleContact = (value) => {
  const contact = value.trim();
  if (!contact) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    || /^@?[a-zA-Z0-9_]{4,32}$/.test(contact)
    || /^\+?[0-9][0-9\s().-]{6,}$/.test(contact)
    || /\b(telegram|whatsapp|wa)\b/i.test(contact);
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
  if (error) {
    error.textContent = message;
    if (!error.id) error.id = `${name}-error`;
  }
  if (field) {
    field.setAttribute("aria-invalid", "true");
    if (error?.id) field.setAttribute("aria-describedby", error.id);
  }
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
  if (field) {
    field.removeAttribute("aria-invalid");
    if (error?.id && field.getAttribute("aria-describedby") === error.id) {
      field.removeAttribute("aria-describedby");
    }
  }
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
  const projectType = getValue(form, "projectType");
  const message = getValue(form, "message");

  if (name.length < 2 || name.length > 80) {
    setFieldError(form, "name", getValidationMessage(form, "name"));
    isValid = false;
  } else {
    clearFieldError(form, "name");
  }

  if (contact.length < 3 || contact.length > 120) {
    setFieldError(form, "contact", getValidationMessage(form, "contact"));
    isValid = false;
  } else if (!isPlausibleContact(contact)) {
    setFieldError(form, "contact", getValidationMessage(form, "contactInvalid"));
    isValid = false;
  } else {
    clearFieldError(form, "contact");
  }

  if (!projectType) {
    setFieldError(form, "projectType", getValidationMessage(form, "projectType"));
    isValid = false;
  } else {
    clearFieldError(form, "projectType");
  }

  if (!message) {
    setFieldError(form, "message", getValidationMessage(form, "message"));
    isValid = false;
  } else if (message.length < 20) {
    setFieldError(form, "message", getValidationMessage(form, "messageShort"));
    isValid = false;
  } else if (message.length > 2000) {
    setFieldError(form, "message", getValidationMessage(form, "messageLong"));
    isValid = false;
  } else {
    clearFieldError(form, "message");
  }

  if (requiresTurnstile(form) && !hasTurnstileResponse(form)) {
    setFormStatus(form, getValidationMessage(form, "turnstile"), true);
    isValid = false;
  }

  return isValid;
};

const validateReviewForm = (form) => {
  let isValid = true;
  const name = getValue(form, "name");
  const company = getValue(form, "company");
  const projectName = getValue(form, "projectName");
  const projectType = getValue(form, "projectType");
  const reviewText = getValue(form, "reviewText");
  const websiteUrl = getValue(form, "websiteUrl");

  if (name.length < 2 || name.length > 80) {
    setFieldError(form, "name", getValidationMessage(form, "name"));
    isValid = false;
  } else {
    clearFieldError(form, "name");
  }

  if (company.length < 2 || company.length > 120) {
    setFieldError(form, "company", getValidationMessage(form, "company"));
    isValid = false;
  } else {
    clearFieldError(form, "company");
  }

  if (projectName.length < 2 || projectName.length > 120) {
    setFieldError(form, "projectName", getValidationMessage(form, "projectName"));
    isValid = false;
  } else {
    clearFieldError(form, "projectName");
  }

  if (projectType.length < 2 || projectType.length > 120) {
    setFieldError(form, "projectType", getValidationMessage(form, "projectType"));
    isValid = false;
  } else {
    clearFieldError(form, "projectType");
  }

  if (reviewText.length < 30 || reviewText.length > 1000) {
    setFieldError(form, "reviewText", getValidationMessage(form, "reviewText"));
    isValid = false;
  } else {
    clearFieldError(form, "reviewText");
  }

  if (!websiteUrl || !isValidUrl(websiteUrl)) {
    setFieldError(form, "websiteUrl", getValidationMessage(form, "websiteUrl"));
    isValid = false;
  } else {
    clearFieldError(form, "websiteUrl");
  }

  if (!getChecked(form, "permissionToPublish")) {
    setFieldError(form, "permissionToPublish", getValidationMessage(form, "permissionToPublish"));
    isValid = false;
  } else {
    clearFieldError(form, "permissionToPublish");
  }

  if (requiresTurnstile(form) && !hasTurnstileResponse(form)) {
    setFormStatus(form, getValidationMessage(form, "turnstile"), true);
    isValid = false;
  }

  return isValid;
};

const updateCounter = (form) => {
  const textarea = getField(form, "reviewText") || getField(form, "message");
  const counter = form.querySelector("[data-counter]");
  if (textarea && counter) {
    const length = String(textarea.value || "").length;
    const max = Number(textarea.getAttribute("maxlength")) || 2000;
    counter.textContent = `${length}/${max}`;
    counter.classList.toggle("is-error", length > max);
  }
};

document.querySelectorAll(".contact-form").forEach((form) => {
  const isReviewForm = getValue(form, "formType") === "review";
  const sourcePage = getField(form, "sourcePage");
  if (sourcePage) {
    sourcePage.value = window.location.href;
  }

  const fieldsToWatch = isReviewForm
    ? ["name", "company", "projectName", "projectType", "websiteUrl", "rating", "reviewText", "permissionToPublish"]
    : ["name", "contact", "projectType", "futureSupport", "message"];

  fieldsToWatch.forEach((name) => {
    const field = getField(form, name);
    if (!field) return;
    field.addEventListener("input", () => {
      if (name === "message" || name === "reviewText") updateCounter(form);
      clearFieldError(form, name);
    });
    field.addEventListener("change", () => clearFieldError(form, name));
  });

  updateCounter(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');

    const isValid = isReviewForm ? validateReviewForm(form) : validateForm(form);

    if (!isValid) {
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

const renderProjectReviewStars = (label) => `
  <div class="project-review-stars" role="img" aria-label="${escapeMarkup(label)}">
    <span aria-hidden="true">&#9733;</span>
    <span aria-hidden="true">&#9733;</span>
    <span aria-hidden="true">&#9733;</span>
    <span aria-hidden="true">&#9733;</span>
    <span aria-hidden="true">&#9733;</span>
  </div>
`;

const getReviewInitial = (review, ui) => {
  const source = String(review.initial || review.name || review.projectName || ui.fallbackName || "A").trim();
  return source ? source.charAt(0).toUpperCase() : "A";
};

const renderProjectReviewCard = (review, ui) => {
  const projectName = String(review.projectName || "").trim();
  const company = String(review.company || "").trim();
  const projectType = String(review.projectType || "").trim();
  const safeUrl = isValidUrl(review.websiteUrl || "") ? review.websiteUrl : "";
  const displayName = review.name || projectName || ui.fallbackName;
  const ratingLabel = review.ratingLabel || (review.rating ? `${ui.rating}: ${review.rating}` : "");
  const sourceLabel = review.sourceLabel || ui.sourceLabel;
  const project = safeUrl
    ? `<a class="project-review-link" href="${escapeMarkup(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeMarkup(ui.projectLink)}</a>`
    : "";

  return `
    <article class="project-review-card" data-review-card>
      <div class="project-review-card__surface">
        <div class="project-review-card__glow" data-review-parallax aria-hidden="true"></div>
        <header class="project-review-card__top">
          ${renderProjectReviewStars(ratingLabel)}
          <span class="project-review-source">${escapeMarkup(sourceLabel)}</span>
        </header>
        <span class="project-review-quote" data-review-parallax aria-hidden="true">&ldquo;</span>
        <blockquote class="project-review-text">${escapeMarkup(review.text)}</blockquote>
        <footer class="project-review-footer">
          <div class="project-review-author">
            <span class="project-review-avatar" aria-hidden="true">${escapeMarkup(getReviewInitial(review, ui))}</span>
            <div class="project-review-author-info">
              <strong>${escapeMarkup(displayName)}</strong>
              ${company ? `<span class="project-review-company">${escapeMarkup(company)}</span>` : ""}
              ${projectName ? `<span class="project-review-project">${escapeMarkup(projectName)}</span>` : ""}
            </div>
          </div>
          <div class="project-review-meta">
            ${projectType ? `<span class="project-review-type">${escapeMarkup(projectType)}</span>` : ""}
            ${project}
          </div>
        </footer>
      </div>
    </article>
  `;
};

const initReviewsPage = () => {
  const list = document.querySelector("[data-reviews-list]");
  const empty = document.querySelector("[data-reviews-empty]");
  if (!list) return;

  const staticCards = list.querySelectorAll("[data-review-card]");
  if (staticCards.length) {
    list.dataset.reviewCount = String(staticCards.length);
    list.hidden = false;
    if (empty) empty.hidden = true;
    return;
  }

  const language = document.body.dataset.language || "pl";
  const ui = reviewUi[language] || reviewUi.pl;
  const visibleReviews = reviewsData.filter((review) => {
    const status = String(review.status || "").toLowerCase();
    return review.lang === language
      && (status === "published" || status === "approved")
      && Boolean(String(review.text || "").trim())
      && review.permissionToPublish === true;
  });

  if (!visibleReviews.length) {
    list.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  list.hidden = false;
  list.classList.remove("reviews-grid");
  list.classList.add("project-reviews-grid");
  list.dataset.reviewCount = String(visibleReviews.length);
  list.innerHTML = visibleReviews.map((review) => renderProjectReviewCard(review, ui)).join("");
};

const initProjectReviewCards = () => {
  const cards = Array.from(document.querySelectorAll("[data-review-card]"));
  if (!cards.length) return;

  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileQuery = window.matchMedia(`(max-width: ${REVIEW_MOBILE_BREAKPOINT - 1}px)`);

  if (reduceMotionQuery.matches) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: REVIEW_REVEAL_THRESHOLD });

    cards.forEach((card, index) => {
      card.style.setProperty("--review-stagger-delay", `${Math.min(index * 90, 240)}ms`);
      revealObserver.observe(card);
    });
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  if (mobileQuery.matches || !("IntersectionObserver" in window)) return;

  const parallaxItems = cards
    .map((card) => ({
      card,
      targets: Array.from(card.querySelectorAll("[data-review-parallax]"))
    }))
    .filter((item) => item.targets.length);

  if (!parallaxItems.length) return;

  const itemByCard = new Map(parallaxItems.map((item) => [item.card, item]));
  const activeItems = new Set();
  let frameRequested = false;

  const resetParallax = (item) => {
    item.card.style.setProperty("--review-parallax-x", "0px");
    item.card.style.setProperty("--review-parallax-y", "0px");
  };

  const updateParallax = () => {
    frameRequested = false;
    if (!activeItems.size) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    activeItems.forEach((item) => {
      const rect = item.card.getBoundingClientRect();
      if (rect.bottom < -160 || rect.top > viewportHeight + 160) return;

      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const progress = (cardCenter - viewportCenter) / viewportCenter;
      const y = Math.max(-REVIEW_PARALLAX_MAX, Math.min(REVIEW_PARALLAX_MAX, progress * -REVIEW_PARALLAX_MAX));
      const x = Math.max(-4, Math.min(4, progress * 4));

      item.card.style.setProperty("--review-parallax-x", `${x.toFixed(2)}px`);
      item.card.style.setProperty("--review-parallax-y", `${y.toFixed(2)}px`);
    });
  };

  const requestParallaxUpdate = () => {
    if (!activeItems.size || frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateParallax);
  };

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const item = itemByCard.get(entry.target);
      if (!item) return;

      if (entry.isIntersecting) {
        activeItems.add(item);
      } else {
        activeItems.delete(item);
        resetParallax(item);
      }
    });

    requestParallaxUpdate();
  }, { rootMargin: "160px 0px", threshold: 0 });

  parallaxItems.forEach((item) => activeObserver.observe(item.card));
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate, { passive: true });
  requestParallaxUpdate();
};

function initHeroFrameScroll() {
  const heroes = document.querySelectorAll("[data-hero-frame-scroll]");
  if (!heroes.length) return;

  heroes.forEach((hero) => {
    const canvas = hero.querySelector(".hero-frame-canvas");
    const visual = hero.querySelector(".scroll-hero-visual");

    if (!canvas || !visual) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const frameCount = 120;
    const frameBasePath = "/assets/hero-globe-frames/";
    const framePath = (index) => `${frameBasePath}frame-${String(index).padStart(3, "0")}.webp`;

    const images = new Array(frameCount);
    const loaded = new Array(frameCount).fill(false);

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    let lastFrameIndex = -1;
    let restLoadingStarted = false;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function resizeCanvasToDisplaySize() {
      const rect = visual.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function loadFrame(index) {
      if (images[index]) return Promise.resolve(images[index]);

      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = framePath(index);

        img.onload = () => {
          loaded[index] = true;
          resolve(img);
        };

        img.onerror = () => {
          console.warn(`Hero frame failed to load: ${framePath(index)}`);
          resolve(null);
        };

        images[index] = img;
      });
    }

    function drawCoverImage(img) {
      if (!img || !img.complete) return;

      resizeCanvasToDisplaySize();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      const imageRatio = imageWidth / imageHeight;

      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = imageWidth;
      let sourceHeight = imageHeight;

      if (imageRatio > canvasRatio) {
        sourceWidth = imageHeight * canvasRatio;
        sourceX = (imageWidth - sourceWidth) / 2;
      } else {
        sourceHeight = imageWidth / canvasRatio;
        sourceY = (imageHeight - sourceHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
      );
    }

    function drawFrame(index, force = false) {
      const img = images[index];

      if (!img || !loaded[index]) return;
      if (!force && index === lastFrameIndex && visual.classList.contains("is-frame-ready")) return;

      drawCoverImage(img);
      lastFrameIndex = index;
      visual.classList.add("is-frame-ready");
    }

    function preloadPriorityFrames() {
      const priorityCount = 16;
      const promises = [];

      for (let i = 0; i < priorityCount; i += 1) {
        promises.push(loadFrame(i));
      }

      Promise.all(promises).then(() => {
        drawFrame(0);
      });
    }

    function preloadRestFrames() {
      if (restLoadingStarted || reduceMotion || isMobile) return;
      restLoadingStarted = true;

      let index = 16;

      function loadNextBatch() {
        const batchSize = 6;
        const batch = [];

        for (let i = 0; i < batchSize && index < frameCount; i += 1) {
          batch.push(loadFrame(index));
          index += 1;
        }

        Promise.all(batch).then(() => {
          if (index < frameCount) {
            if ("requestIdleCallback" in window) {
              window.requestIdleCallback(loadNextBatch, { timeout: 800 });
            } else {
              window.setTimeout(loadNextBatch, 80);
            }
          }
        });
      }

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadNextBatch, { timeout: 800 });
      } else {
        window.setTimeout(loadNextBatch, 80);
      }
    }

    function getProgress() {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      return clamp(-rect.top / (viewportHeight * 0.9), 0, 1);
    }

    function updateTarget() {
      targetProgress = getProgress();
      preloadRestFrames();

      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    }

    function animate() {
      const smoothFactor = 0.11;

      currentProgress += (targetProgress - currentProgress) * smoothFactor;

      const frameIndex = Math.round(currentProgress * (frameCount - 1));
      drawFrame(frameIndex);

      const translateY = currentProgress * 72;
      const translateX = currentProgress * -18;
      const scale = 1.04 + currentProgress * 0.08;

      visual.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;

      hero.dataset.frameProgress = currentProgress.toFixed(3);
      hero.dataset.frameTarget = targetProgress.toFixed(3);
      hero.dataset.frameIndex = String(frameIndex);

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        currentProgress = targetProgress;
        rafId = null;
      }
    }

    resizeCanvasToDisplaySize();

    if (reduceMotion || isMobile) {
      loadFrame(0).then(() => drawFrame(0));
      return;
    }

    preloadPriorityFrames();

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", () => {
      resizeCanvasToDisplaySize();
      drawFrame(lastFrameIndex >= 0 ? lastFrameIndex : 0, true);
      updateTarget();
    });

    updateTarget();
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

initPortfolioSections();
initReviewsPage();
initProjectReviewCards();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroFrameScroll);
} else {
  initHeroFrameScroll();
}
refreshIcons();
renderMenuButton();
