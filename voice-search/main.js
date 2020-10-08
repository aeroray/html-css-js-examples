const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("input");
const micBtn = document.querySelector("#mic");
const micSVG = document.querySelector("#voice");
const muteSVG = document.querySelector("#mute");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  console.log("Your browser supports speech recognition.");

  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  micBtn.addEventListener("click", () => {
    if (muteSVG.classList.contains("invisible")) {
      recognition.start();
    } else {
      recognition.stop();
    }

    recognition.addEventListener("start", () => {
      micSVG.classList.add("invisible");
      muteSVG.classList.remove("invisible");
      searchInput.focus();
      console.log("Speech Recognition Active.");
    });

    recognition.addEventListener("end", () => {
      muteSVG.classList.add("invisible");
      micSVG.classList.remove("invisible");
      searchInput.focus();
      console.log("Speech Recognition Disconnected.");
    });

    recognition.addEventListener("result", (e) => {
      let current = e.resultIndex;
      const transcript = e.results[current][0].transcript;

      if (transcript === "搜索" || transcript.toLowerCase().trim() === "go") {
        searchForm.submit();
      } else if (
        transcript === "重置" ||
        transcript.toLowerCase().trim() === "reset"
      ) {
        searchInput.value = "";
      } else if (
        transcript === "停止" ||
        transcript.toLowerCase().trim() === "stop"
      ) {
        recognition.stop();
      } else {
        searchInput.value += transcript;
      }
    });
  });
} else {
  console.log("Your browser does not support speech recognition.");
  micBtn.removeChild(micSVG);
}
