const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal');
const clearButton = document.getElementById('clear-btn');

const previousDisplay = document.getElementById('previous-operand');
const currentDisplay = document.getElementById('current-operand');

let currentOperand = '';
let previousOperand = '';
let operator = null;
let resetNext = false;

// Basic math functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) return 'Cannot divide by 0';
    return a / b;
}

// Operate function
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return b;
    }
}

// Update display
function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    previousDisplay.textContent = operator ? `${previousOperand} ${operator}` : '';
}

// Handle number input
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resetNext) {
            currentOperand = '';
            resetNext = false;
        }
        if (currentOperand.length < 15) {
            currentOperand += button.textContent;
            updateDisplay();
        }
    });
});

// Handle operator input
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand === '' && previousOperand === '') return;

        if (currentOperand === '' && operator) {
            operator = button.textContent; // allow operator change
            updateDisplay();
            return;
        }

        if (previousOperand !== '' && currentOperand !== '') {
            const result = operate(operator, previousOperand, currentOperand);
            currentOperand = (typeof result === 'number') ? Math.round(result * 10000) / 10000 : result;
            previousOperand = currentOperand;
            currentOperand = '';
        } else {
            previousOperand = currentOperand;
            currentOperand = '';
        }

        operator = button.textContent;
        updateDisplay();
    });
});

// Handle decimal input
decimalButton.addEventListener('click', () => {
    if (resetNext) {
        currentOperand = '0.';
        resetNext = false;
    } else if (!currentOperand.includes('.')) {
        currentOperand += currentOperand === '' ? '0.' : '.';
    }
    updateDisplay();
});

// Handle equal
equalButton.addEventListener('click', () => {
    if (previousOperand === '' || currentOperand === '' || !operator) return;

    const result = operate(operator, previousOperand, currentOperand);
    currentOperand = (typeof result === 'number') ? Math.round(result * 10000) / 10000 : result;
    previousOperand = '';
    operator = null;
    resetNext = true;
    updateDisplay();
});

// Handle clear
clearButton.addEventListener('click', () => {
    currentOperand = '';
    previousOperand = '';
    operator = null;
    resetNext = false;
    updateDisplay();
});

// Initial display
updateDisplay();
