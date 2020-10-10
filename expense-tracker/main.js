const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
const dummyTransactions = [
  { id: 1, text: "Book", amount: -10 },
  { id: 2, text: "Salary", amount: 300 },
];

let transactions = localStorage.getItem("transactions")
  ? localStorageTransactions
  : dummyTransactions;

//入口
init();
form.addEventListener("submit", addTransaction);

//初始化
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

//将单条数据挂载到 DOM
function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const li = document.createElement("li");

  li.classList.add(transaction.amount < 0 ? "minus" : "plus");
  li.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}<button class="delete-btn" onclick="deleteTransaction(${
    transaction.id
  })">X</button></span>
  `;

  list.appendChild(li);
}

//更新余额，收入，支出
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = Math.abs(
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  balance.innerText = "$" + total;
  moneyPlus.innerText = "$" + income;
  moneyMinus.innerText = "$" + expense;
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: Date.now(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
