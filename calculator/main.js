const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const prevDisplay = document.querySelector('[data-prev-operand]');
const curDisplay = document.querySelector('[data-cur-operand]');

class Calculator {
  constructor(prevDisplay, curDisplay) {
    this.prevDisplay = prevDisplay;
    this.curDisplay = curDisplay;
    this.clear();
  }

  clear() {
    this.prevOperand = '';
    this.curOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.curOperand = this.curOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.curOperand.includes('.')) return;
    this.curOperand += number;
  }

  chooseOperation(operation) {
    if (this.curOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.curOperand;
    this.curOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const cur = parseFloat(this.curOperand);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case '+':
        computation = prev + cur;
        break;
      case '-':
        computation = prev - cur;
        break;
      case '×':
        computation = prev * cur;
        break;
      case '÷':
        computation = prev / cur;
        break;
      default:
        break;
    }
    this.curOperand = computation.toString();
    this.operation = undefined;
    this.prevOperand = '';
  }

  updateDisplay() {
    this.curDisplay.innerText = this.curOperand
      ? this.getComma(this.curOperand)
      : '0';
    if (this.operation != null) {
      this.prevDisplay.innerText = `${this.getComma(this.prevOperand)} ${
        this.operation
      }`;
    } else {
      this.prevDisplay.innerText = this.getComma(this.prevOperand);
    }
  }

  getComma(number) {
    const integer = parseFloat(number.split('.')[0]);
    const decima = number.split('.')[1];
    let integerDisplay;
    if (isNaN(integer)) {
      integerDisplay = '';
    } else {
      integerDisplay = integer.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decima != null) {
      return `${integerDisplay}.${decima}`;
    } else {
      return integerDisplay;
    }
  }
}

const calculator = new Calculator(prevDisplay, curDisplay);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
