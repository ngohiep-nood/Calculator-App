class Calculator {
    constructor(prevOperandText, currentOperandText) {
        this.prevOperandText = prevOperandText;
        this.currentOperandText = currentOperandText;
        this.Clear();
    }

    Clear() {
        this.previousOperand= '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    Delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        this.operation = operation;
        if(this.previousOperand !== '') {
            this.Compute();
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    Compute() {
        let compute;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '-':
                compute = prev - current;
            break;
            case '+':
                compute = prev + current;
            break;
            case '*':
                compute = prev * current;
            break;
            case '÷':
                compute = prev / current;
            break;
            default: 
            return;
        }
        this.currentOperand = compute;
        this.operation = undefined;
        this.previousOperand = '';
    }

    displayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    UpdateDisplay() {
        this.currentOperandText.innerText = this.displayNumber(this.currentOperand);
        if(this.operation != undefined) {
            this.prevOperandText.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.prevOperandText.innerText = this.previousOperand;
        }
    }
}


const numberButton = document.querySelectorAll('[data-number]');
const clearButton = document.querySelector('[data-clear-all]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const operationButton = document.querySelectorAll('[data-operand]');

const prevOperandText = document.querySelector('[data-previous-Operand]');
const currentOperandText = document.querySelector('[data-current-Operand]');

const calculator = new Calculator(prevOperandText, currentOperandText);

numberButton.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.UpdateDisplay();
    });
})

operationButton.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.UpdateDisplay();
    });
})

clearButton.addEventListener('click', () => {
    calculator.Clear();
    calculator.UpdateDisplay();
})

equalButton.addEventListener('click' , () => {
    calculator.Compute();
    calculator.UpdateDisplay();
})

deleteButton.addEventListener('click' , () => {
    calculator.Delete();
    calculator.UpdateDisplay();
})