'use strict'
const numberInput = document.getElementById('progress');
const display = document.getElementById('display')
const percentageButton = document.getElementById('percentage');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const addButton = document.getElementById('add');
const substractionButton = document.getElementById('substraction');
const totalButton = document.getElementById('total');
const result = document.getElementById('result')

let total;
let temp;
let operator;
let displayValue;


function print(num) {
    if (num === '/' || num === '*' || num === '+' || num === '-'); {
        //
    }
    else if (num === 'del') {
        numberInput.value = numberInput.value.slice(0,-1);
    }
    else if (num === 'c') {
        numberInput.value = null;
        result.innerText = null;
    }
    else {
//        temp = numberInput.value;
        numberInput.value = temp + num;
//        displayValue = 
    }    
    temp = numberInput.value;
    console.log(`temp = ${temp}, type = ${typeof temp}`);
}

totalButton.addEventListener('click', () => {
    total = eval(numberInput.value);
    result.innerText = total;
});
