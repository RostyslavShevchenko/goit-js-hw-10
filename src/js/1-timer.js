import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
    timeout: 5000,
    resetOnHover: false,
    backgroundColor: 'yellow',
    messageColor: 'blue',
    position: "topRight",
});

let userSelectedDate = null;
const dateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]')
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.warning({
    // title: 'Hey',
    message: 'Please choose a date in the future'
});
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

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

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

startBtn.addEventListener('click', () => startCountdown(userSelectedDate))

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startCountdown(targetDate) {
    const daysEl = document.querySelector('[data-days]');
    const hoursEl = document.querySelector('[data-hours]');
    const minutesEl = document.querySelector('[data-minutes]');
    const secondsEl = document.querySelector('[data-seconds]');
    startBtn.disabled = true;
    dateTimePicker.disabled = true;

    const countdownInterval = setInterval(counter, 1000);

    function counter() {
    const currentDate = new Date();
    const difference = targetDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(difference);

    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);

    daysEl.textContent = formattedDays;
    hoursEl.textContent = formattedHours;
    minutesEl.textContent = formattedMinutes;
    secondsEl.textContent = formattedSeconds;

    if (difference <= 0) {
    clearInterval(countdownInterval);
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    dateTimePicker.disabled = false;
}
  }
  counter(); // Викликаємо функцію counter вручну для відображення відліку відразу
}
