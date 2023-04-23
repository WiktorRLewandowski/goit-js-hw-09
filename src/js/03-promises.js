import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
  event.preventDefault(event);

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let formDelay = +delay.value;
  let formStep = +step.value;
  let formAmount = +amount.value;

  for (let i = 1; i <= formAmount; i++) {
    createPromise(i, formDelay + i * formStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

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
  });
}
