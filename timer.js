const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

function updateTimerDisplay(timeLeftInSeconds) {
  timerDisplay.textContent = formatTimeLeft(timeLeftInSeconds);
}

function formatTimeLeft(timeLeftInSeconds) {
  const minutes = Math.floor(timeLeftInSeconds / 60);
  const seconds = timeLeftInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  chrome.runtime.sendMessage({ action: 'startTimer' });
}

function resetTimer() {
  chrome.runtime.sendMessage({ action: 'resetTimer' });
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.timeLeft) {
    updateTimerDisplay(message.timeLeft);
  }
});
