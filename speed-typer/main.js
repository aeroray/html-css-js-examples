const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-btn");

const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

let randomWord;
let score = 0;
let time = 6;
let timeInterval;
let difficulty = localStorage.getItem("difficulty")
  ? localStorage.getItem("difficulty")
  : "easy";

//初始化页面
difficultySelect.value = difficulty;
startButton.addEventListener("click", startGame);

text.addEventListener("input", (e) => {
  const term = e.target.value;
  if (term === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    //回答正确增加时间并马上更新当前时间
    switch (difficulty) {
      case "medium":
        time += 3;
        break;
      case "hard":
        time += 2;
        break;
      default:
        time += 4;
        break;
    }
    timeElement.innerText = time + "s";
  }
});

settingsButton.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

function startGame() {
  startButton.parentElement.style.display = "none";
  addWordToDOM();
  text.focus();

  timeElement.innerText = time + "s";
  timeInterval = setInterval(updateTime, 1000);
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

function endGame() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()" class="try-again-btn">Try Again</button>
  `;
  endgameElement.style.display = "flex";
}
