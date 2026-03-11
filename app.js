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
    "nav.skills": "Skills"
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
    "nav.skills": "Dovednosti"
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
    "nav.skills": "Kenntnisse"
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
    "nav.skills": "Навыки"
  }
};

/* -----------------------------------------
   HELPERS
----------------------------------------- */
function padToTwoDigits(value) {
  return String(value).padStart(2, "0");
}

/* -----------------------------------------
   PRAGUE CLOCK
----------------------------------------- */
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

/* -----------------------------------------
   PAGE TIMER
----------------------------------------- */
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

/* -----------------------------------------
   THEME SWITCHING
----------------------------------------- */
function updateThemeButtonLabel() {
  if (!themeToggleLabel || !languageSwitcher) return;

  const currentLang = languageSwitcher.value || "en";
  const dictionary = translations[currentLang] || translations.en;
  const isLight = document.body.classList.contains("light-theme");

  themeToggleLabel.textContent = isLight
    ? dictionary["controls.themeLight"]
    : dictionary["controls.themeDark"];
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

/* -----------------------------------------
   LANGUAGE SWITCHING
----------------------------------------- */
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

/* -----------------------------------------
   EVENT LISTENERS
----------------------------------------- */
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

/* -----------------------------------------
   INITIAL STATE
----------------------------------------- */
const savedLanguage = localStorage.getItem("site-language") || "en";
const savedTheme = localStorage.getItem("site-theme") || "dark";

if (languageSwitcher) {
  languageSwitcher.value = savedLanguage;
}

applyLanguage(savedLanguage);
applyTheme(savedTheme);
updatePragueTime();
updateTimeOnPage();

/* -----------------------------------------
   REFRESH TIMERS EVERY SECOND
----------------------------------------- */
setInterval(() => {
  updatePragueTime();
  updateTimeOnPage();
}, 1000);
