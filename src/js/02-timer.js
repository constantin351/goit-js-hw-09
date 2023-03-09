import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const dateInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

const outputDays = document.querySelector('span[data-days]');
const outputHours = document.querySelector('span[data-hours]');
const outputMinutes = document.querySelector('span[data-minutes]');
const outputSeconds = document.querySelector('span[data-seconds]');

let selectedTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    // defaultDate: new Date(),
    defaultDate: Date.now(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.warning("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
            selectedTime = selectedDates[0];
           
            startBtn.addEventListener('click', onStartBtnClick);
            
            function onStartBtnClick() {
                intervalId = setInterval(() => {
                    startBtn.disabled = true;
                    const currentTime = Date.now();
                    
                    const deltaTime = selectedTime - currentTime;

                    const { days, hours, minutes, seconds } = convertMs(deltaTime);

                    outputDays.textContent = days;
                    outputHours.textContent = hours;
                    outputMinutes.textContent = minutes;
                    outputSeconds.textContent = seconds;

                    if (deltaTime < 1000) { 
                        clearInterval(intervalId);
                        startBtn.disabled = false;
                    }
                }, 1000)
            };
        }
        
  },
};


function addLeadingZero(value) { 
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr(dateInput, options);
