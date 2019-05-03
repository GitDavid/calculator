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
const del = document.getElementById("del");
const calculate = document.getElementById("calculate");
const point = document.getElementById("point");

let isStart = true;
let displayEndsWith = "0";

function enterNums() {
    if (displayEndsWith == "0" && this.textContent == "0") {
        // do nothing
    } else {
        if (isStart)
            display.textContent = "";
        display.textContent += this.textContent;
        if (displayEndsWith != "." || isStart)
            displayEndsWith = "num";
        isStart = false;
    }
}

function enterOperators(button) {
    if (isStart)
        display.textContent = result.textContent;
    if (displayEndsWith != "op")
        display.textContent += this.textContent;
    isStart = false;
    displayEndsWith = "op"
}

function enterPoint() {
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
}

function enterClear() {
    result.textContent = "0";
    display.textContent = "0";
    displayEndsWith = "0";
    isStart = true;
}

function enterDel() {
    if (display.textContent.length == 1) {
        result.textContent = "0";
        display.textContent = "0";
        displayEndsWith = "0";
        isStart = true;
    } else {
        if (display.textContent.slice(-1) == " ") {
            display.textContent = display.textContent.slice(0, -3);
        } else {
            if (display.textContent.slice(-1) == ".")
                displayEndsWith = "num";
            display.textContent = display.textContent.slice(0, -1);
        }
    }
}

function enterCalculate() {
    const displayInput = display.textContent.split(" ");
    const operators = ["×", "÷", "+", "-"];
    if (displayInput[displayInput.length - 1] == "") {
        result.textContent = "ERROR";
    } else {
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
    }
}

Array.prototype.forEach.call(numInputButtons, (button) => {
    button.addEventListener("click", enterNums);
});

Array.prototype.forEach.call(opInputButtons, (button) => {
    button.addEventListener("click", enterOperators);
});

point.addEventListener("click", enterPoint)
clear.addEventListener("click", enterClear)
del.addEventListener("click", enterDel)
calculate.addEventListener("click", enterCalculate)

window.addEventListener("keydown", function(e) {
    const keyCode = e.keyCode
    const keyButton = document.querySelector(`button[key-code="${keyCode}"]`);
    if (!keyButton) return;
    if (96 <= keyCode  && keyCode <= 105) {
        enterNums.call(keyButton); // how to pass context of key to the functions defined above??
    } else if ([106, 107, 109, 111].indexOf(keyCode) != -1) {
        enterOperators.call(keyButton);
    } else if (keyCode == 110) {
        enterPoint();
    } else if (keyCode == 8) {
        enterDel();
    } else if (keyCode == 27) {
        enterClear();
    } else if (keyCode == 13) {
        enterCalculate();
    } else {
        return;
    }
});