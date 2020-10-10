const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

const words = ["progress", "test", "apple", "javascript"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

displayWord(); //显示被隐藏的随机单词

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<div class="letter">${
            correctLetters.includes(letter) ? letter : ""
          }</div>`
      )
      .join("")}
  `;
  //去除换行
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "You Have Won! 😊";
    popup.style.display = "flex";
  }
}

//对输入字符首先需要进行判断是否有效，本案例只承认字母为合法输入
//其次需要判断隐藏单词是否包含输入字符，如果包含则判断重复与否并视情况加入对应数组，如果不包含同理
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      //输入正确的字符
      if (!correctLetters.includes(letter)) {
        //输入的正确字符是新的且不重复
        correctLetters.push(letter);
        displayWord();
      } else {
        //提示输入的字符是重复的
        showNotification();
      }
    } else {
      //输入错误的字符
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong Letters</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join(", ")}
  `;
  //显示小人部分
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You Have Lost! 😭";
    popup.style.display = "flex";
  }
}

let timer;
function showNotification() {
  clearTimeout(timer);
  notification.classList.add("show");
  timer = setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

playAgainButton.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
});
