const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const scoreNum = document.getElementById("score");

let grid = 20;
let score = 0;
let count = 0;

const Snake = {
  x: grid * 5,
  y: grid * 5,
  vx: grid,
  vy: 0,
  cells: [],
  max: 4,
};
const Apple = {
  x: grid * 10,
  y: grid * 10,
};

function update() {
  let handle = requestAnimationFrame(update);
  if (++count < 10) return;
  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  Snake.x += Snake.vx;
  Snake.y += Snake.vy;

  if (Snake.x < 0) Snake.x = canvas.width - grid;
  if (Snake.x > canvas.width - grid) Snake.x = 0;
  if (Snake.y < 0) Snake.y = canvas.height - grid;
  if (Snake.y > canvas.height - grid) Snake.y = 0;

  Snake.cells.unshift({ x: Snake.x, y: Snake.y });
  if (Snake.cells.length > Snake.max) {
    Snake.cells.pop();
  }

  ctx.fillStyle = "#ff6767";
  ctx.fillRect(Apple.x, Apple.y, grid - 1, grid - 1);

  ctx.fillStyle = "#333";
  Snake.cells.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    if (cell.x === Apple.x && cell.y === Apple.y) {
      Snake.max++;
      score++;
      scoreNum.innerHTML = score;
      Apple.x = getRandomInt(0, canvas.width / grid) * grid;
      Apple.y = getRandomInt(0, canvas.height / grid) * grid;
    }
    for (let i = index + 1; i < Snake.cells.length; i++) {
      if (cell.x === Snake.cells[i].x && cell.y === Snake.cells[i].y) {
        cancelAnimationFrame(handle);
        restart.style.display = "block";
      }
    }
  });
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", (e) => {
  switch (true) {
    case e.keyCode === 65 && Snake.vx === 0: // left
      Snake.vy = 0;
      Snake.vx = grid * -1;
      break;
    case e.keyCode === 68 && Snake.vx === 0: // right
      Snake.vy = 0;
      Snake.vx = grid;
      break;
    case e.keyCode === 87 && Snake.vy === 0: // top
      Snake.vx = 0;
      Snake.vy = grid * -1;
      break;
    case e.keyCode === 83 && Snake.vy === 0: // bottom
      Snake.vx = 0;
      Snake.vy = grid;
      break;
  }
});

start.addEventListener("click", function () {
  start.style.display = "none";
  update();
});

restart.addEventListener("click", function () {
  restart.style.display = "none";
  window.location.reload();
});
