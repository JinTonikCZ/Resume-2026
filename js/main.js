/**
 * main.js
 * ------------------------------------------------------------------
 * This is the application entry point.
 * It creates all services, wires dependencies together,
 * and starts the application controller.
 */

import { translations } from "./config/translations.js";
import { StorageService } from "./services/storage.service.js";
import { ClockService } from "./services/clock.service.js";
import { ThemeService } from "./services/theme.service.js";
import { I18nService } from "./services/i18n.service.js";
import { AppController } from "./controllers/app.controller.js";

/* ---------------------------------------------------------
   DOM references
--------------------------------------------------------- */
const navCurrentTimeElement = document.getElementById("nav-current-time");
const navTimeOnPageElement = document.getElementById("nav-time-on-page");
const languageSwitcherElement = document.getElementById("language-switcher");
const themeToggleElement = document.getElementById("theme-toggle");
const themeToggleLabelElement = document.getElementById("theme-toggle-label");

/* ---------------------------------------------------------
   Service creation
--------------------------------------------------------- */
const storageService = new StorageService();

const clockService = new ClockService(
  navCurrentTimeElement,
  navTimeOnPageElement
);

const themeService = new ThemeService(
  document.body,
  themeToggleLabelElement,
  storageService
);

const i18nService = new I18nService(
  translations,
  storageService
);

/* ---------------------------------------------------------
   Application controller
--------------------------------------------------------- */
const appController = new AppController({
  languageSwitcher: languageSwitcherElement,
  themeToggle: themeToggleElement,
  i18nService,
  themeService,
  clockService
});

/* ---------------------------------------------------------
   Application startup
--------------------------------------------------------- */
appController.start();
