const keys = document.querySelectorAll(".box");
document.addEventListener("keydown", playSound);
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.box[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition() {
  this.classList.remove("playing");
}

let timer;
const switcher = document.querySelector(".switch");
const bpm = document.querySelector(".bpm");
const onoff = document.querySelector(".onoff");
const metronome = new Audio("./sounds/Metronome.wav");
const input = document.querySelector('input[type="number"]');
let number = input.value;
switcher.addEventListener("click", dropdown);

input.onchange = function (e) {
  clearInterval(timer);
  number = e.target.value;
  timer = setInterval(() => {
    changeColor();
    metronome.play();
  }, 60000 / number);
};

function changeColor() {
  if (!bpm.classList.contains("changecolor")) {
    bpm.classList.add("changecolor");
  } else {
    bpm.classList.remove("changecolor");
  }
}

function dropdown() {
  if (onoff.innerHTML === "OFF") {
    bpm.style.top = "3rem";
    onoff.innerHTML = "&nbsp;ON";
    setTimeout(() => {
      bpm.style.opacity = "1";
      switcher.style.borderRadius = "0.5rem 0.5rem 0 0";
    }, 100);
    timer = setInterval(() => {
      changeColor();
      metronome.play();
    }, 60000 / number);
  } else {
    clearInterval(timer);
    bpm.style.top = "-3rem";
    onoff.innerHTML = "OFF";
    bpm.style.opacity = "0";
    setTimeout(() => {
      switcher.style.borderRadius = "0.5rem";
    }, 100);
  }
}
