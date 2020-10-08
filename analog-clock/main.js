const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const date = document.querySelector("#date");
const deg = 6;

setInterval(() => {
  let time = new Date();
  let dt = time.toLocaleDateString().replace(/\//g, "-");
  let hr = time.getHours() * 30;
  let mn = time.getMinutes() * deg;
  let sc = time.getSeconds() * deg;
  hour.style.transform = `rotateZ(${hr + mn / 12}deg)`;
  minute.style.transform = `rotateZ(${mn}deg)`;
  second.style.transform = `rotateZ(${sc}deg)`;
  date.innerHTML = `${dt}`;
});
