function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let intervalId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
    document.body.classList.add('active');
  }
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;

  startButton.disabled = false;
  stopButton.disabled = true;
  document.body.classList.remove('active');
});
