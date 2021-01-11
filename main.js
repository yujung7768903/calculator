'use strict'
const numberInput = document.getElementById('progress');
const percentageButton = document.getElementById('percentage');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const addButton = document.getElementById('add');
const substractionButton = document.getElementById('substraction');
const totalButton = document.getElementById('total');
const result = document.getElementById('result')

let total = 0;
let temp;
let operator;

//let property = '2+4'
let str = "2+4";
temp = (new Function('return '+'str'))();
console.log(temp);

/*
function print(num) {
    if (0 <= num && num <= 9) {
        numberInput.value = numberInput.value + num;
    }
    else if (num === '/' || num === 'x' || num === '+' || num === '-') {
        operator = num;
        temp = Number(numberInput.value);
        numberInput.value = null;
    } 
    else if (num === '%') {
        total = Number(numberInput.value) / 100;
        result.innerText = total;
    }
    else if (num === 'del') {
        numberInput.value = numberInput.value.slice(0,-1);
    }
    else if (num === 'c') {
        numberInput.value = null;
        result.innerText = null;
    }
}
*/
function print(num) {
    if (num === 'del') {
        numberInput.value = numberInput.value.slice(0,-1);
    }
    else if (num === 'c') {
        numberInput.value = null;
        result.innerText = null;
    }
    else {
        numberInput.value = numberInput.value + num;
    }

}

totalButton.addEventListener('click', () => {
    switch (operator) {
        case '/':
            total = temp / Number(numberInput.value);
            break;
        case 'x':
            total = temp * Number(numberInput.value);
            break;
        case '+':
            total = temp + Number(numberInput.value);
            console.log('00');
            break;
        default:
            break;
    }
    result.innerText = total;
});