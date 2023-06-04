import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const amountInput = document.querySelector('input[name="amount"]');
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');

  const amount = parseInt(amountInput.value);
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);

  let currentDelay = delay; // Declare a new variable to store the current delay

  // Call createPromise for each promise position
  for (let position = 1; position <= amount; position++) {
    createPromise(position, currentDelay);
    currentDelay += step; // Update the current delay
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
