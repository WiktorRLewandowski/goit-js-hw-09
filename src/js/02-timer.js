import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

const calendarEl = document.getElementById('datetime-picker');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let now = new Date().getTime();
let interval = null;
let countdown = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();

    let optimizedTime = selectedDate - now;
    let timer = convertMs(optimizedTime);

    clearInterval();
    if (selectedDate > now) {
      startBtn.removeAttribute('disabled');
      daysCounter.innerText = addLeadingZero(timer.days);
      hoursCounter.innerText = addLeadingZero(timer.hours);
      minutesCounter.innerText = addLeadingZero(timer.minutes);
      secondsCounter.innerText = addLeadingZero(timer.seconds);

      startBtn.addEventListener('click', () => {
        interval = setInterval(() => {
          if (selectedDate - new Date().getTime() <= 0) {
            clearInterval(interval);
            Notiflix.Notify.success('Hurray!');
          }
          let timespan = selectedDate - new Date().getTime();
          countdown = convertMs(timespan);
          daysCounter.innerText = addLeadingZero(countdown.days);
          hoursCounter.innerText = addLeadingZero(countdown.hours);
          minutesCounter.innerText = addLeadingZero(countdown.minutes);
          secondsCounter.innerText = addLeadingZero(countdown.seconds);
        }, 1000);
      });
    } else {
      Notiflix.Notify.failure('Please, select future date.');
      startBtn.setAttribute('disabled', '');
    }
  },
};

flatpickr(calendarEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
