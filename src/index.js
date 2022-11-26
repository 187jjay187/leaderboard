import './index.css';
import { getInputsList, listNewInput } from './functionality.js';

// select class's
const form = document.querySelector('.inputScore');
const refreshButton = document.querySelector('.refreshBtn');
const successMsg = document.querySelector('.successMsg');

// function to submit user and score input
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = form.elements.user;
  const scoreInput = form.elements.score;

  // add values
  const newData = {
    user: userInput.value.trim(),
    score: scoreInput.value,
  };

  // add the new input to the data list
  const result = listNewInput(newData);
  form.reset();

  // input result
  result.then((data) => {
    if (data === 'Scoreboard loaded.') {
      successMsg.innerHTML = '';
      successMsg.classList.add('success');
      setTimeout(() => {
        successMsg.classList.remove('success');
      }, 2000);
    } else {
      successMsg.innerHTML = '';
      successMsg.classList.add('error');
      setTimeout(() => {
        successMsg.classList.remove('error');
      }, 2000);
    }
  }).catch(() => {
    successMsg.innerHTML = '';
    successMsg.classList.add('error');
    setTimeout(() => {
      successMsg.classList.remove('error');
    }, 2000);
  });
});

//  add refresh button click to get inputs from api
refreshButton.addEventListener('click', getInputsList);
