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
    return a / b;
}

function operate(a, operator, b) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

const inputButtons = document.getElementsByClassName("input");
const display = document.getElementById("display");
const result = document.getElementById("result");
const clear = document.getElementById("clear");
const calculate = document.getElementById("calculate");

Array.prototype.forEach.call(inputButtons, (button) => {
    button.addEventListener("click", () => {
        display.textContent += button.textContent;
    })
})

clear.addEventListener("click", () => {
    display.textContent = "";
})

calculate.addEventListener("click", () => {
    // assume proper formatting...for now
    const displayInput = display.textContent.split(" ");
    result.textContent = operate(...displayInput);
})