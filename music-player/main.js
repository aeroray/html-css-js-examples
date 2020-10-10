const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

let songIndex = 0; //初始歌曲下标
const songs = ["Different Tomorrow", "Beautiful"]; //歌曲列表

loadSong(songs[songIndex]); //初始化加载默认歌曲

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/audio/${song}.mp3`;
  cover.src = `assets/img/${song}.jpg`;
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i").classList = "fas fa-play";
  audio.pause();
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i").classList = "fas fa-pause";
  audio.play();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
