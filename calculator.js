let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (expression && !isOperator(expression[expression.length - 1])) {
        expression += op;
        updateDisplay();
    }
}

function appendDecimal() {
    const lastNumber = getLastNumber();
    if (!lastNumber.includes('.')) {
        expression += '.';
        updateDisplay();
    }
}

function appendFunction(func) {
    expression += func;
    updateDisplay();
}

function appendParenthesis(paren) {
    expression += paren;
    updateDisplay();
}

function appendConstant(constant) {
    expression += constant;
    updateDisplay();
}

function toggleNegative() {
    if (expression) {
        const lastNumber = getLastNumber();
        if (lastNumber) {
            const negNumber = lastNumber.startsWith('-') 
                ? lastNumber.substring(1) 
                : '-' + lastNumber;
            expression = expression.substring(0, expression.lastIndexOf(lastNumber)) + negNumber;
            updateDisplay();
        }
    }
}

function calculatePercentage() {
    try {
        const result = eval(expression) / 100;
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
    }
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    display.value = '0';
}

function updateDisplay() {
    display.value = expression || '0';
}

function getLastNumber() {
    const operators = /[+\-*/()]/;
    let lastNumber = '';
    for (let i = expression.length - 1; i >= 0; i--) {
        if (operators.test(expression[i])) {
            break;
        }
        lastNumber = expression[i] + lastNumber;
    }
    return lastNumber;
}

function isOperator(char) {
    return /[+\-*/]/.test(char);
}

function calculate() {
    try {
        // Replace mathematical symbols with JavaScript operators
        let calc = expression
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-')
            .replace(/√/g, 'Math.sqrt')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/pow\(/g, 'Math.pow(')
            .replace(/cbrt\(/g, 'Math.cbrt(');
        
        // Convert degrees to radians for trigonometric functions
        const result = eval(calc);
        
        // Format result to avoid floating point errors
        expression = Math.round(result * 100000000) / 100000000;
        display.value = expression;
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === '(') {
        appendParenthesis('(');
    } else if (e.key === ')') {
        appendParenthesis(')');
    }
});

// Initialize display
updateDisplay();