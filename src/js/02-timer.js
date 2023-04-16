import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');

const calendarEl = document.getElementById('datetime-picker');
const daysCounter = document.querySelector('.value[data-days]');
const hoursCounter = document.querySelector('.value[data-hours]');
const minutesCounter = document.querySelector('.value[data-minutes]');
const secondsCounter = document.querySelector('.value[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let interval = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const optimizedTime = selectedDate - today;
    let timer = convertMs(optimizedTime);
    console.log(timer);
    if (selectedDate > today) {
      startBtn.removeAttribute('disabled');
      interval = setInterval(() => {
        daysCounter.textContent = timer.days;
        hoursCounter.textContent = timer.hours;
        minutesCounter.textContent = timer.minutes;
        secondsCounter.textContent = timer.seconds;
      }, 1000);
    } else {
      alert('Please, select future date.');
      startBtn.setAttribute('disabled', '');
    }

    // startBtn.addEventListener('click', countStarter(selectedDate));
  },
};

const today = new Date().getTime();
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

// let interval = null;
// function countStarter(value) {
//   interval = setInterval(() => {
//     value = value - new Date().getTime();
//     return value;
//   }, 1000);
//   if (value === new Date().getTime()) {
//     clearInterval();
//   }
// }
