const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

populateUI(); //从本地获取数据并更新 UI
updateSelectedCount(); //初始化更新座位数及总票价

//下拉选择电影时触发
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//点击选择座位时触发
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//更新已选座位数以及票价总和
function updateSelectedCount() {
  //seats 和 selectedSeats 都是 DOM 节点
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //当前已选座位下标的数组
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  //保存该下标数组到本地
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//保存当前选择的电影下标以及单价
function setMovieData(index, price) {
  localStorage.setItem("selectedMovieIndex", index);
  localStorage.setItem("selectedMoviePrice", price);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    //轮询：可选座位的下标是否存在于本地保存的所选座位数组中
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMoviePrice !== null) {
    ticketPrice = selectedMoviePrice;
  }
}
