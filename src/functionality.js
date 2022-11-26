// create scoreboard and baseurl
const scoreBoard = document.querySelector('.scoreBoard');
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/6mzncyQiZHJghNSeHNhA/scores/';

// show score list elements in dynamic li
const showScores = ({ user, score }, index) => {
  const list = document.createElement('li');
  list.className = 'list-item';
  list.innerHTML = `<span class="index">${index}</span><span class="name">${user}</span><span class="score">${score}</span>`;

  return list;
};

// get the list of scores from the api baseurl
const getInputsList = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const scores = data.result;
    scores.sort((x, y) => y.score - x.score);
    scoreBoard.innerHTML = '';

    // index score
    let index = 0;
    scores.forEach((score) => {
      index += 1;
      const scoreIndex = index > 3 ? index : '';
      scoreBoard.appendChild(showScores(score, scoreIndex));
    });
    return scores;
  } catch (error) {
    return error;
  }
};

// post new data to the baseurl
const listNewInput = async (newData) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    const successResult = await response.json();
    getInputsList();
    return successResult.result;
  }
  throw new Error('Error: something went wrong');
};

// export inputs
module.exports = { getInputsList, listNewInput };