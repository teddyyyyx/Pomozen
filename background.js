// background.js

let intervalId;
let timeLeftInSeconds = 25 * 60; // 25 minutes in seconds
let isRunning = false;

function formatTimeLeft(timeLeftInSeconds) {
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
  chrome.runtime.sendMessage({ timeLeft: timeLeftInSeconds });
}

function startTimer() {
  isRunning = true;
  intervalId = setInterval(() => {
    timeLeftInSeconds--;
    updateTimerDisplay();
    if (timeLeftInSeconds === 0) {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(intervalId);
}

function resetTimer() {
  pauseTimer();
  timeLeftInSeconds = 25 * 60;
  updateTimerDisplay();
}

function toggleTimer() {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    toggleTimer();
  } else if (message.action === 'resetTimer') {
    resetTimer();
  }
});
