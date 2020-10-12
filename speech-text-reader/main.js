const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readButton = document.getElementById("read");
const toggleButton = document.getElementById("toggle");
const closeButton = document.getElementById("close");

const data = [
  {
    image: "https://source.unsplash.com/400x300/?apple",
    text: "It is about apple",
  },
  {
    image: "https://source.unsplash.com/400x300/?banana",
    text: "It is about banana",
  },
  {
    image: "https://source.unsplash.com/400x300/?car",
    text: "It is about car",
  },
  {
    image: "https://source.unsplash.com/400x300/?rabit",
    text: "It is about rabit",
  },
  {
    image: "https://source.unsplash.com/400x300/?mountain",
    text: "It is about mountain",
  },
  {
    image: "https://source.unsplash.com/400x300/?lake",
    text: "It is about lake",
  },
  {
    image: "https://source.unsplash.com/400x300/?food",
    text: "It is about food",
  },
  {
    image: "https://source.unsplash.com/400x300/?sky",
    text: "It is about sky",
  },
  {
    image: "https://source.unsplash.com/400x300/?glass",
    text: "It is about glass",
  },
  {
    image: "https://source.unsplash.com/400x300/?dog",
    text: "It is about dog",
  },
  {
    image: "https://source.unsplash.com/400x300/?cat",
    text: "It is about cat",
  },
  {
    image: "https://source.unsplash.com/400x300/?computer",
    text: "It is about computer",
  },
];
let voices = [];

data.forEach(createBox);
getVoices();

//初始化语音合成器，合成器说话需要传入表达内容这一参数
const message = new SpeechSynthesisUtterance();

toggleButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

closeButton.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

speechSynthesis.addEventListener("voiceschanged", getVoices);

voicesSelect.addEventListener("change", setVoice);

readButton.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
  `;
  //点击时通过语音讲述信息
  box.addEventListener("click", () => {
    setTextMessage(text); //先设置需要被讲述的信息
    speakText(); //将信息讲述
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });
  main.appendChild(box);
}

function getVoices() {
  voicesSelect.innerHTML = "";
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}
