const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


//list of words for game
const words = ['sigh', 'tense', 'airplance', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving', 'trust', 'announcements', 'mouth', 'jealous', 'winner'];

//Init word

let randomWord;

//Init score
let score = 0;

//Init itme
let time = 10;



// sets difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// foucs on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {

  let ans = Math.random() * words.length;
  return words[Math.floor(ans)];
}

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


// update time; 

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// game over show end screen
function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out</h1> <p>Your final score is ${score}</p> <button onclick="location.reload()">Reload</button>`;

  endgameEl.style.display = 'flex';
}
addWordToDOM();
//updateScore();


// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    }
    else if (difficulty === 'medium') {
      time += 3;
    }
    else {
      time += 5;
    }

    updateTime();
  }
});


// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// settings select


settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
