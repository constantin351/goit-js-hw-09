const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

// let timerId = null;
let intervalId = null;
 

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStartBtnClick);

stopBtn.disabled = true;

function onStartBtnClick() {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // timerId = setTimeout(() => {
    intervalId = setInterval(() => {
        // startBtn.disabled = true;
        // stopBtn.disabled = false;
        body.style.backgroundColor = getRandomHexColor();
     }, 1000)
        
    // }, 0);
};

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() { 
    // clearTimeout(timerId);
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
}