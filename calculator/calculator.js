let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        //This is not a number
        handleSymbol(value);
    } else {
        //This is a number
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(symbol){
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '+':
            handleMath(symbol);
            break;
        case '−':
            handleMath(symbol);
            break;
        case '×':
            handleMath(symbol);
            break;
        case '÷':
            handleMath(symbol);
            break;
        case '=':
            if (previousOperator === null) {
                // Need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;       
    }
    
}

function handleMath(symbol) {
    if (buffer === '0') {
        // Do nothing
        return;
    } 
    
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−;') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else { 
        runningTotal /= intBuffer;
    } 
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
};

function rerender() {
    screen.innerText = buffer;
  };

function init() {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();