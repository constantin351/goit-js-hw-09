const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;
 

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onStartBtnClick);

stopBtn.disabled = true;

function onStartBtnClick() {
     intervalId = setInterval(() => {        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
};

stopBtn.addEventListener('click', onStopBtnClick);

function onStopBtnClick() { 
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
}