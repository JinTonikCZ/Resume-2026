/* =========================================
   Resume website interactive logic

   Features:
   1. Prague local time in top bar
   2. Time spent on page in top bar
   3. Language switcher (EN / CZ / DE / RU)
   4. Theme switcher (dark / light)
========================================= */

/* -----------------------------------------
   DOM ELEMENT REFERENCES
----------------------------------------- */
const navCurrentTimeElement = document.getElementById("nav-current-time");
const navTimeOnPageElement = document.getElementById("nav-time-on-page");
const languageSwitcher = document.getElementById("language-switcher");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");

/* -----------------------------------------
   PAGE SESSION START TIME
----------------------------------------- */
const pageOpenTimestamp = Date.now();

/* -----------------------------------------
   TRANSLATIONS
----------------------------------------- */
const translations = {
  en: {
    "controls.language": "Language",
    "controls.themeDark": "Dark theme",
    "controls.themeLight": "Light theme",
    "controls.prague": "Prague",
    "controls.session": "On page",
    "nav.contact": "Contact",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.projects": "Projects",
    "nav.languages": "Languages",
    "nav.skills": "Skills",
    "hero.eyebrow": "Resume / Portfolio",
    "hero.lead": "DevOps- and infrastructure-oriented IT specialist with hands-on experience in Linux administration, cloud tooling, monitoring, automation, and practical technical support. Currently studying Informatics in Prague and building portfolio projects in Git, Docker, Kubernetes, dashboards, and documentation.",
    "hero.downloadCv": "Download CV",
    "hero.chipLocation": "Prague, Czech Republic",
    "hero.chipOpen": "Open to junior IT / DevOps roles",
    "hero.chipStudies": "Master’s studies in progress",
    "hero.focusTitle": "Current focus",
    "hero.focusText": "Linux, DevOps, Git, Docker, Kubernetes, dashboards, and practical infrastructure work.",
    "hero.educationTitle": "Education status",
    "hero.educationText": "Master’s studies in Informatics in progress, not yet completed.",
    "contact.title": "Contact",
    "contact.subtitle": "Main contact information and professional links.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.resume": "Resume PDF",
    "contact.openCv": "Open CV",
    "experience.title": "Work Experience",
    "experience.subtitle": "Professional background based on the current CV.",
    "experience.job1.title": "Junior Linux Admin",
    "experience.job1.meta": "Cloudinfrastack • Prague, Czech Republic • 11/2024 – 02/2025",
    "experience.job1.li1": "Linux Ubuntu administration (v22, v24).",
    "experience.job1.li2": "OpenStack cloud software administration.",
    "experience.job1.li3": "Monitoring of cloud infrastructure with Sensu Uchiwa.",
    "experience.job1.li4": "Automation with Puppet and Ansible.",
    "experience.job1.li5": "Work with Docker, Kubernetes, Jenkins, GitLab, Heat, Foreman, and Consul.",
    "education.title": "Education and Training",
    "education.subtitle": "Current education status is described correctly.",
    "education.current.title": "Informatics",
    "education.current.meta": "Czech University of Life Sciences Prague (ČZU) • Prague, Czech Republic • 10/2024 – 06/2026",
    "education.current.li1": "Master’s studies in progress.",
    "education.current.li2": "This degree is not completed yet.",
    "education.current.li3": "Current focus: ArgoCD, Kubernetes, Git, Power BI, IBM SPSS Modeler, NotebookLM.",
    "projects.title": "Selected GitHub Projects",
    "projects.subtitle": "Projects that support the portfolio in analytics, infrastructure, and practical IT work.",
    "projects.azd.title": "AŽD Financial Analysis Dashboard",
    "projects.azd.text": "Management-oriented dashboard project with financial KPIs, plan vs. actual comparison, and variance analysis.",
    "projects.azd.button": "Open project on GitHub",
    "projects.profile.title": "GitHub Profile",
    "projects.profile.text": "Additional repositories and technical practice projects in Linux, DevOps, web development, and academic work.",
    "projects.profile.button": "View all repositories",
    "languages.title": "Languages",
    "languages.subtitle": "Language levels based on the current CV.",
    "languages.russian": "Russian",
    "languages.russianLevel": "Native language",
    "languages.czech": "Czech",
    "languages.english": "English",
    "skills.title": "Skills",
    "skills.subtitle": "Main technical areas from the resume.",
    "skills.techTitle": "Technical Skills",
    "skills.additionalTitle": "Additional Information",
    "skills.li1": "Ability to design computer networks.",
    "skills.li2": "Practical work with Git and GitHub.",
    "skills.li3": "Interest in infrastructure, monitoring, and cloud tooling.",
    "skills.li4": "Driving licence: category B."
  },
  cs: {
    "controls.language": "Jazyk",
    "controls.themeDark": "Tmavé téma",
    "controls.themeLight": "Světlé téma",
    "controls.prague": "Praha",
    "controls.session": "Na stránce",
    "nav.contact": "Kontakt",
    "nav.experience": "Praxe",
    "nav.education": "Vzdělání",
    "nav.projects": "Projekty",
    "nav.languages": "Jazyky",
    "nav.skills": "Dovednosti",
    "hero.eyebrow": "Životopis / Portfolio",
    "hero.lead": "IT specialista zaměřený na DevOps a infrastrukturu s praktickými zkušenostmi v oblasti správy Linuxu, cloudových nástrojů, monitoringu, automatizace a technické podpory. Aktuálně studuji informatiku v Praze a buduju portfolio projektů v oblasti Gitu, Dockeru, Kubernetes, dashboardů a dokumentace.",
    "hero.downloadCv": "Stáhnout CV",
    "hero.chipLocation": "Praha, Česká republika",
    "hero.chipOpen": "Otevřen junior IT / DevOps rolím",
    "hero.chipStudies": "Magisterské studium probíhá",
    "hero.focusTitle": "Aktuální zaměření",
    "hero.focusText": "Linux, DevOps, Git, Docker, Kubernetes, dashboardy a praktická práce s infrastrukturou.",
    "hero.educationTitle": "Stav studia",
    "hero.educationText": "Magisterské studium informatiky právě probíhá, zatím není dokončeno.",
    "contact.title": "Kontakt",
    "contact.subtitle": "Hlavní kontaktní údaje a profesní odkazy.",
    "contact.email": "E-mail",
    "contact.phone": "Telefon",
    "contact.resume": "PDF životopis",
    "contact.openCv": "Otevřít CV",
    "experience.title": "Pracovní zkušenosti",
    "experience.subtitle": "Profesní zkušenosti podle aktuálního CV.",
    "experience.job1.title": "Junior Linux Admin",
    "experience.job1.meta": "Cloudinfrastack • Praha, Česká republika • 11/2024 – 02/2025",
    "experience.job1.li1": "Správa Linux Ubuntu (v22, v24).",
    "experience.job1.li2": "Administrace cloudového softwaru OpenStack.",
    "experience.job1.li3": "Monitoring cloudové infrastruktury pomocí Sensu Uchiwa.",
    "experience.job1.li4": "Automatizace pomocí Puppet a Ansible.",
    "experience.job1.li5": "Práce s Dockerem, Kubernetes, Jenkins, GitLab, Heat, Foreman a Consul.",
    "education.title": "Vzdělání a školení",
    "education.subtitle": "Současný stav studia je popsán správně.",
    "education.current.title": "Informatika",
    "education.current.meta": "Česká zemědělská univerzita v Praze (ČZU) • Praha, Česká republika • 10/2024 – 06/2026",
    "education.current.li1": "Magisterské studium probíhá.",
    "education.current.li2": "Tento titul zatím není dokončen.",
    "education.current.li3": "Aktuální zaměření: ArgoCD, Kubernetes, Git, Power BI, IBM SPSS Modeler, NotebookLM.",
    "projects.title": "Vybrané GitHub projekty",
    "projects.subtitle": "Projekty podporující portfolio v oblasti analytiky, infrastruktury a praktické IT práce.",
    "projects.azd.title": "AŽD Finanční analytický dashboard",
    "projects.azd.text": "Managementově orientovaný dashboard s finančními KPI, porovnáním plán vs. skutečnost a analýzou odchylek.",
    "projects.azd.button": "Otevřít projekt na GitHubu",
    "projects.profile.title": "GitHub profil",
    "projects.profile.text": "Další repozitáře a technické projekty z oblasti Linuxu, DevOps, webového vývoje a akademické práce.",
    "projects.profile.button": "Zobrazit všechny repozitáře",
    "languages.title": "Jazyky",
    "languages.subtitle": "Jazykové úrovně podle aktuálního CV.",
    "languages.russian": "Ruština",
    "languages.russianLevel": "Rodný jazyk",
    "languages.czech": "Čeština",
    "languages.english": "Angličtina",
    "skills.title": "Dovednosti",
    "skills.subtitle": "Hlavní technické oblasti z životopisu.",
    "skills.techTitle": "Technické dovednosti",
    "skills.additionalTitle": "Další informace",
    "skills.li1": "Schopnost navrhovat počítačové sítě.",
    "skills.li2": "Praktická práce s Gitem a GitHubem.",
    "skills.li3": "Zájem o infrastrukturu, monitoring a cloudové nástroje.",
    "skills.li4": "Řidičský průkaz skupiny B."
  },
  de: {
    "controls.language": "Sprache",
    "controls.themeDark": "Dunkles Thema",
    "controls.themeLight": "Helles Thema",
    "controls.prague": "Prag",
    "controls.session": "Auf Seite",
    "nav.contact": "Kontakt",
    "nav.experience": "Erfahrung",
    "nav.education": "Ausbildung",
    "nav.projects": "Projekte",
    "nav.languages": "Sprachen",
    "nav.skills": "Kenntnisse",
    "hero.eyebrow": "Lebenslauf / Portfolio",
    "hero.lead": "IT-Spezialist mit Fokus auf DevOps und Infrastruktur und praktischer Erfahrung in Linux-Administration, Cloud-Tools, Monitoring, Automatisierung und technischem Support. Derzeit studiere ich Informatik in Prag und baue Portfolio-Projekte in Git, Docker, Kubernetes, Dashboards und Dokumentation auf.",
    "hero.downloadCv": "CV herunterladen",
    "hero.chipLocation": "Prag, Tschechische Republik",
    "hero.chipOpen": "Offen für Junior-IT- / DevOps-Rollen",
    "hero.chipStudies": "Masterstudium läuft",
    "hero.focusTitle": "Aktueller Fokus",
    "hero.focusText": "Linux, DevOps, Git, Docker, Kubernetes, Dashboards und praktische Infrastrukturarbeit.",
    "hero.educationTitle": "Studienstatus",
    "hero.educationText": "Das Masterstudium in Informatik läuft derzeit und ist noch nicht abgeschlossen.",
    "contact.title": "Kontakt",
    "contact.subtitle": "Wichtige Kontaktdaten und professionelle Links.",
    "contact.email": "E-Mail",
    "contact.phone": "Telefon",
    "contact.resume": "Lebenslauf PDF",
    "contact.openCv": "CV öffnen",
    "experience.title": "Berufserfahrung",
    "experience.subtitle": "Beruflicher Hintergrund auf Basis des aktuellen CV.",
    "experience.job1.title": "Junior Linux Admin",
    "experience.job1.meta": "Cloudinfrastack • Prag, Tschechische Republik • 11/2024 – 02/2025",
    "experience.job1.li1": "Administration von Linux Ubuntu (v22, v24).",
    "experience.job1.li2": "Administration der OpenStack-Cloud-Software.",
    "experience.job1.li3": "Monitoring der Cloud-Infrastruktur mit Sensu Uchiwa.",
    "experience.job1.li4": "Automatisierung mit Puppet und Ansible.",
    "experience.job1.li5": "Arbeit mit Docker, Kubernetes, Jenkins, GitLab, Heat, Foreman und Consul.",
    "education.title": "Ausbildung und Training",
    "education.subtitle": "Der aktuelle Bildungsstatus ist korrekt beschrieben.",
    "education.current.title": "Informatik",
    "education.current.meta": "Tschechische Universität für Lebenswissenschaften Prag (ČZU) • Prag, Tschechische Republik • 10/2024 – 06/2026",
    "education.current.li1": "Masterstudium läuft.",
    "education.current.li2": "Dieser Abschluss ist noch nicht abgeschlossen.",
    "education.current.li3": "Aktueller Fokus: ArgoCD, Kubernetes, Git, Power BI, IBM SPSS Modeler, NotebookLM.",
    "projects.title": "Ausgewählte GitHub-Projekte",
    "projects.subtitle": "Projekte zur Unterstützung des Portfolios in den Bereichen Analytik, Infrastruktur und praktische IT-Arbeit.",
    "projects.azd.title": "AŽD Finanzanalyse-Dashboard",
    "projects.azd.text": "Managementorientiertes Dashboard mit Finanz-KPIs, Plan-Ist-Vergleich und Abweichungsanalyse.",
    "projects.azd.button": "Projekt auf GitHub öffnen",
    "projects.profile.title": "GitHub-Profil",
    "projects.profile.text": "Weitere Repositories und technische Praxisprojekte in Linux, DevOps, Webentwicklung und akademischer Arbeit.",
    "projects.profile.button": "Alle Repositories anzeigen",
    "languages.title": "Sprachen",
    "languages.subtitle": "Sprachniveaus laut aktuellem CV.",
    "languages.russian": "Russisch",
    "languages.russianLevel": "Muttersprache",
    "languages.czech": "Tschechisch",
    "languages.english": "Englisch",
    "skills.title": "Kenntnisse",
    "skills.subtitle": "Wichtige technische Bereiche aus dem Lebenslauf.",
    "skills.techTitle": "Technische Kenntnisse",
    "skills.additionalTitle": "Zusätzliche Informationen",
    "skills.li1": "Fähigkeit, Computernetzwerke zu entwerfen.",
    "skills.li2": "Praktische Arbeit mit Git und GitHub.",
    "skills.li3": "Interesse an Infrastruktur, Monitoring und Cloud-Tools.",
    "skills.li4": "Führerschein der Klasse B."
  },
  ru: {
    "controls.language": "Язык",
    "controls.themeDark": "Тёмная тема",
    "controls.themeLight": "Светлая тема",
    "controls.prague": "Прага",
    "controls.session": "На странице",
    "nav.contact": "Контакты",
    "nav.experience": "Опыт",
    "nav.education": "Образование",
    "nav.projects": "Проекты",
    "nav.languages": "Языки",
    "nav.skills": "Навыки",
    "hero.eyebrow": "Резюме / Портфолио",
    "hero.lead": "IT-специалист с фокусом на DevOps и инфраструктуру, с практическим опытом в администрировании Linux, работе с cloud-инструментами, мониторингом, автоматизацией и технической поддержкой. Сейчас учусь на информатике в Праге и развиваю портфолио-проекты по Git, Docker, Kubernetes, dashboard и документации.",
    "hero.downloadCv": "Скачать CV",
    "hero.chipLocation": "Прага, Чехия",
    "hero.chipOpen": "Открыт к junior IT / DevOps ролям",
    "hero.chipStudies": "Магистратура в процессе",
    "hero.focusTitle": "Текущий фокус",
    "hero.focusText": "Linux, DevOps, Git, Docker, Kubernetes, dashboard и практическая работа с инфраструктурой.",
    "hero.educationTitle": "Статус обучения",
    "hero.educationText": "Магистратура по информатике сейчас проходит и ещё не завершена.",
    "contact.title": "Контакты",
    "contact.subtitle": "Основные контакты и профессиональные ссылки.",
    "contact.email": "Эл. почта",
    "contact.phone": "Телефон",
    "contact.resume": "PDF-резюме",
    "contact.openCv": "Открыть CV",
    "experience.title": "Опыт работы",
    "experience.subtitle": "Профессиональный опыт на основе текущего CV.",
    "experience.job1.title": "Junior Linux Admin",
    "experience.job1.meta": "Cloudinfrastack • Прага, Чехия • 11/2024 – 02/2025",
    "experience.job1.li1": "Администрирование Linux Ubuntu (v22, v24).",
    "experience.job1.li2": "Администрирование cloud-платформы OpenStack.",
    "experience.job1.li3": "Мониторинг cloud-инфраструктуры с помощью Sensu Uchiwa.",
    "experience.job1.li4": "Автоматизация с Puppet и Ansible.",
    "experience.job1.li5": "Работа с Docker, Kubernetes, Jenkins, GitLab, Heat, Foreman и Consul.",
    "education.title": "Образование и обучение",
    "education.subtitle": "Текущий статус обучения описан корректно.",
    "education.current.title": "Информатика",
    "education.current.meta": "Чешский аграрный университет в Праге (ČZU) • Прага, Чехия • 10/2024 – 06/2026",
    "education.current.li1": "Магистратура в процессе.",
    "education.current.li2": "Эта степень ещё не завершена.",
    "education.current.li3": "Текущий фокус: ArgoCD, Kubernetes, Git, Power BI, IBM SPSS Modeler, NotebookLM.",
    "projects.title": "Избранные GitHub-проекты",
    "projects.subtitle": "Проекты, поддерживающие портфолио в аналитике, инфраструктуре и практической IT-работе.",
    "projects.azd.title": "AŽD Financial Analysis Dashboard",
    "projects.azd.text": "Управленческий dashboard с финансовыми KPI, сравнением план/факт и анализом отклонений.",
    "projects.azd.button": "Открыть проект на GitHub",
    "projects.profile.title": "GitHub профиль",
    "projects.profile.text": "Другие репозитории и практические технические проекты по Linux, DevOps, web-разработке и учебной работе.",
    "projects.profile.button": "Посмотреть все репозитории",
    "languages.title": "Языки",
    "languages.subtitle": "Уровни языков по текущему CV.",
    "languages.russian": "Русский",
    "languages.russianLevel": "Родной язык",
    "languages.czech": "Чешский",
    "languages.english": "Английский",
    "skills.title": "Навыки",
    "skills.subtitle": "Основные технические направления из резюме.",
    "skills.techTitle": "Технические навыки",
    "skills.additionalTitle": "Дополнительная информация",
    "skills.li1": "Умение проектировать компьютерные сети.",
    "skills.li2": "Практическая работа с Git и GitHub.",
    "skills.li3": "Интерес к инфраструктуре, мониторингу и cloud-инструментам.",
    "skills.li4": "Водительские права категории B."
  }
};

function padToTwoDigits(value) {
  return String(value).padStart(2, "0");
}

function updatePragueTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Prague",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  if (navCurrentTimeElement) {
    navCurrentTimeElement.textContent = formatter.format(now);
  }
}

function updateTimeOnPage() {
  const nowTimestamp = Date.now();
  const diffMilliseconds = nowTimestamp - pageOpenTimestamp;
  const totalSeconds = Math.floor(diffMilliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (navTimeOnPageElement) {
    navTimeOnPageElement.textContent =
      `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
  }
}

function updateThemeButtonLabel() {
  if (!themeToggleLabel || !languageSwitcher) return;

  const currentLang = languageSwitcher.value || "en";
  const dictionary = translations[currentLang] || translations.en;
  const isLight = document.body.classList.contains("light-theme");

  themeToggleLabel.textContent = isLight
    ? dictionary["controls.themeLight"]
    : dictionary["controls.themeDark"];
}

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  updateThemeButtonLabel();
  localStorage.setItem("site-language", lang);
}

function applyTheme(themeName) {
  if (themeName === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }

  updateThemeButtonLabel();
  localStorage.setItem("site-theme", themeName);
}

if (languageSwitcher) {
  languageSwitcher.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  });
}

const savedLanguage = localStorage.getItem("site-language") || "en";
const savedTheme = localStorage.getItem("site-theme") || "dark";

if (languageSwitcher) {
  languageSwitcher.value = savedLanguage;
}

applyLanguage(savedLanguage);
applyTheme(savedTheme);
updatePragueTime();
updateTimeOnPage();

setInterval(() => {
  updatePragueTime();
  updateTimeOnPage();
}, 1000);
