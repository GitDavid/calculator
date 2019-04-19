function add(a, b) {
    return parseFloat(a) + parseFloat(b);
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
        case "×": return multiply(a, b);
        case "÷": return divide(a, b);
    }
}

const opInputButtons = document.getElementsByClassName("opinput");
const numInputButtons = document.getElementsByClassName("numinput");
const display = document.getElementById("display");
const result = document.getElementById("result");
const clear = document.getElementById("clear");
const calculate = document.getElementById("calculate");
const point = document.getElementById("point");

let isStart = true;
let displayEndsWith = "0";

Array.prototype.forEach.call(numInputButtons, (button) => {
    button.addEventListener("click", () => {
        if (displayEndsWith == "0" && button.textContent == "0") {
            // do nothing
        } else {
            if (isStart)
                display.textContent = "";
            display.textContent += button.textContent;
            if (displayEndsWith != "." || isStart)
                displayEndsWith = "num";
            isStart = false;
        }
    })
})

Array.prototype.forEach.call(opInputButtons, (button) => {
    button.addEventListener("click", () => {
        if (isStart)
            display.textContent = result.textContent;
        if (displayEndsWith != "op")
            display.textContent += button.textContent;
        isStart = false;
        displayEndsWith = "op"
    })
})

point.addEventListener("click", () => {
    if (isStart || displayEndsWith == "op" || displayEndsWith == "num") {
        if (isStart) {
            display.textContent = "0.";
        } else if (displayEndsWith == "op") {
            display.textContent += "0.";
        } else if (displayEndsWith == "num") {
            display.textContent += ".";
        }
        isStart = false;
        displayEndsWith = ".";
    }
})

clear.addEventListener("click", () => {
    result.textContent = "0";
    display.textContent = "0";
    displayEndsWith = "0";
    isStart = true;
})

calculate.addEventListener("click", () => {
    const displayInput = display.textContent.split(" ");
    const operators = ["×", "÷", "+", "-"];
    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        while (displayInput.includes(op)) {
            const opIdx = displayInput.indexOf(op);
            const opResult = operate(displayInput[opIdx - 1], op, displayInput[opIdx + 1]);
            displayInput.splice(opIdx - 1, 3, opResult);
        }
    }
    result.textContent = displayInput[0];
    isStart = true;
})