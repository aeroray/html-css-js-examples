const currencyElement1 = document.getElementById("currency-one");
const currencyElement2 = document.getElementById("currency-two");
const amountElement1 = document.getElementById("amount-one");
const amountElement2 = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swapButton = document.getElementById("swap");

currencyElement1.addEventListener("change", calculate);
currencyElement2.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);
amountElement2.addEventListener("input", calculate);
swapButton.addEventListener("click", () => {
  [currencyElement1.value, currencyElement2.value] = [
    currencyElement2.value,
    currencyElement1.value,
  ];
  calculate();
});

async function calculate() {
  const currency1 = currencyElement1.value;
  const currency2 = currencyElement2.value;

  const { data } = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${currency1}`
  );
  const rate = data.rates[currency2];
  rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`;

  amountElement2.value = (amountElement1.value * rate).toFixed(2);
}

calculate();
