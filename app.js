/* =========================================
   Resume website interactive logic

   Features:
   1. Prague local time in top bar
   2. Time spent on page in top bar
   3. Language switcher (EN / CZ / DE / RU)
   4. Theme switcher (dark / light)
   5. Translations loaded from JSON files
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
   CURRENT LANGUAGE DICTIONARY
----------------------------------------- */
let currentDictionary = {};

/* -----------------------------------------
   HELPERS
----------------------------------------- */
function padToTwoDigits(value) {
  return String(value).padStart(2, "0");
}

/* -----------------------------------------
   LOAD TRANSLATION FILE
----------------------------------------- */
async function loadTranslations(languageCode) {
  const response = await fetch(`js/translations/${languageCode}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load translation file: ${languageCode}.json`);
  }

  return await response.json();
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
   THEME LABEL UPDATE
----------------------------------------- */
function updateThemeButtonLabel() {
  if (!themeToggleLabel) return;

  const isLight = document.body.classList.contains("light-theme");

  themeToggleLabel.textContent = isLight
    ? currentDictionary["controls.themeLight"] || "Light theme"
    : currentDictionary["controls.themeDark"] || "Dark theme";
}

/* -----------------------------------------
   THEME SWITCHING
----------------------------------------- */
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
async function applyLanguage(languageCode) {
  try {
    currentDictionary = await loadTranslations(languageCode);

    document.documentElement.lang = languageCode;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");

      if (currentDictionary[key]) {
        element.textContent = currentDictionary[key];
      }
    });

    updateThemeButtonLabel();
    localStorage.setItem("site-language", languageCode);
  } catch (error) {
    console.error("Translation loading error:", error);
  }
}

/* -----------------------------------------
   EVENT LISTENERS
----------------------------------------- */
if (languageSwitcher) {
  languageSwitcher.addEventListener("change", async (event) => {
    await applyLanguage(event.target.value);
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
async function initializeApp() {
  const savedLanguage = localStorage.getItem("site-language") || "en";
  const savedTheme = localStorage.getItem("site-theme") || "dark";

  if (languageSwitcher) {
    languageSwitcher.value = savedLanguage;
  }

  await applyLanguage(savedLanguage);
  applyTheme(savedTheme);
  updatePragueTime();
  updateTimeOnPage();

  setInterval(() => {
    updatePragueTime();
    updateTimeOnPage();
  }, 1000);
}

initializeApp();
