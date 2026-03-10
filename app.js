/* =========================================
   app.js
   Main interactive logic for the resume page

   Features:
   1. Show current local time
   2. Show how long the user stays on the page
========================================= */

/* -----------------------------------------
   Get references to HTML elements
----------------------------------------- */
const currentTimeElement = document.getElementById("current-time");
const timeOnPageElement = document.getElementById("time-on-page");

/* -----------------------------------------
   Store the page open timestamp
   This is used to calculate time spent
----------------------------------------- */
const pageOpenTimestamp = Date.now();

/* -----------------------------------------
   Helper function:
   Format number as two digits
   Example: 4 -> "04"
----------------------------------------- */
function padToTwoDigits(value) {
  return String(value).padStart(2, "0");
}

/* -----------------------------------------
   Update current clock
   Shows the user's local browser time
----------------------------------------- */
function updateCurrentTime() {
  const now = new Date();

  const hours = padToTwoDigits(now.getHours());
  const minutes = padToTwoDigits(now.getMinutes());
  const seconds = padToTwoDigits(now.getSeconds());

  currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

/* -----------------------------------------
   Update time spent on the page
   Counts difference between now and page open time
----------------------------------------- */
function updateTimeOnPage() {
  const nowTimestamp = Date.now();
  const diffMilliseconds = nowTimestamp - pageOpenTimestamp;

  const totalSeconds = Math.floor(diffMilliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timeOnPageElement.textContent =
    `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}:${padToTwoDigits(seconds)}`;
}

/* -----------------------------------------
   Initial render
   Make sure values appear immediately
----------------------------------------- */
updateCurrentTime();
updateTimeOnPage();

/* -----------------------------------------
   Update both timers every second
----------------------------------------- */
setInterval(() => {
  updateCurrentTime();
  updateTimeOnPage();
}, 1000);
