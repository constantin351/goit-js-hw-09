import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

form.addEventListener("submit", createPromises);

function createPromises(event) { 
    event.preventDefault();

    const {
    elements: { delay, step, amount }
    } = event.currentTarget;

    let delayValue = delay.valueAsNumber;
    let stepValue = step.valueAsNumber;
    let amountValue = amount.valueAsNumber;
    
    for (let i = 1; i <= amountValue; i += 1) { 
        createPromise(i, delayValue)
        .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

        delayValue += stepValue;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay)
    });
}

