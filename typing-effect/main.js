const textArray = ["Hi.", "I'm ray.", "I love coding and sleeping."];
const textSpan = document.getElementById("text");

let index = 0;
let charIndex = 0;

let typingDelay = 200;
let erasingDelay = 100;
let interval = 1000;

function type() {
  if (charIndex < textArray[index].length) {
    if (!textSpan.classList.contains("typing")) {
      textSpan.classList.add("typing");
    }
    textSpan.textContent += textArray[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    textSpan.classList.remove("typing");
    setTimeout(erase, interval);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!textSpan.classList.contains("typing")) {
      textSpan.classList.add("typing");
    }
    textSpan.textContent = textArray[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textSpan.classList.remove("typing");
    index++;
    if (index === textArray.length) {
      index = 0;
    }
    setTimeout(type, interval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) {
    setTimeout(type, interval);
  }
});
