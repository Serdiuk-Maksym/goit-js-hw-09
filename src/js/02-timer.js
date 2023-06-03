import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      Notiflix.Notify.success('Valid date selected');
      document.querySelector('[data-start]').disabled = false;
    }

    let timeExample = selectedDates[0].getTime();
    console.log(timeExample);
  },
};

const datePicker = flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = datePicker.selectedDates[0];
  const countdown = selectedDate.getTime() - Date.now();

  if (countdown <= 0) {
    clearInterval(timerInterval);
    Notiflix.Notify.info('Countdown finished');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(countdown);

  document.querySelector('[data-days]').textContent = formatTime(days);
  document.querySelector('[data-hours]').textContent = formatTime(hours);
  document.querySelector('[data-minutes]').textContent = formatTime(minutes);
  document.querySelector('[data-seconds]').textContent = formatTime(seconds);
}

let timerInterval;

document
  .querySelector('button[data-start]')
  .addEventListener('click', function () {
    Notiflix.Notify.success('Countdown started');
    timerInterval = setInterval(startTimer, 1000);
    this.disabled = true;
  });

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}
