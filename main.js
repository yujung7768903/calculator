'use strict'
const numberInput = document.getElementById('display');
const progress = document.getElementById('progress')
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
let operator = "";
let progressValue;


function print(num) {
    if (num === '/' || num === '*' || num === '+' || num === '-') {
        operator = num;
        progress.innerText = progress.innerText + numberInput.value;
        numberInput.value = null;
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
        numberInput.value = numberInput.value + num;
//        progressValue = 
    }    
    temp = numberInput.value;
    console.log(`temp = ${temp}, type = ${typeof temp}`);
}

totalButton.addEventListener('click', () => {
    total = eval(numberInput.value);
    result.innerText = total;
});
