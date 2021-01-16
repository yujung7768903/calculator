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
let inputValueArr = [];
let lastValue = progress.innerText.slice(-1);


function print(num) {
    if (num === '/' || num === '*' || num === '+' || num === '-' || num === '%') {
        if (Number(lastValue) == NaN) {
            progress.innerText = progress.innerText.slice(0,-1) + num;
            inputValueArr.pop();
        }
        else {
            inputValueArr.push(Number(numberInput.value));
        }
        inputValueArr.push(num);
        numberInput.value = null;
        progress.innerText = progress.innerText + num;
    }
    else if (num === 'del') {
        progress.innerText = progress.innerText.slice(0,-1);
        numberInput.value = numberInput.value.slice(0,-1);
    }
    else if (num === 'c') {
        progress.innerText = null;
        numberInput.value = null;
        result.innerText = null;
        inputValueArr = [];
    }
    else {
        numberInput.value = numberInput.value + num;
        progress.innerText = progress.innerText + num;
    }
    temp = numberInput.value;
}

totalButton.addEventListener('click', () => {
    if (Number(lastValue) === NaN) {
        progress.innerText = progress.innerText.slice(0,-1);
        inputValueArr.pop();
    }
    inputValueArr.push(Number(numberInput.value));
    console.log(inputValueArr);
    inputValueArr.forEach(element => {
        if (element === '/') {
            let idxDiv = inputValueArr.indexOf('/');
            let calDiv = inputValueArr.slice(idxDiv-1,idxDiv+2);
            console.log(calDiv);
            let insteadDiv = calDiv[0] / calDiv[2];
            inputValueArr.splice(idxDiv-1, 3, insteadDiv);
            console.log(inputValueArr);

        }
        else if (element === '*') {
            let idxMul = inputValueArr.indexOf('*');      
            let calMul = inputValueArr.slice(idxMul-1,idxMul+2);
            console.log(calMul);
            let insteadMul = calMul[0] * calMul[2];
            inputValueArr.splice(idxMul-1, 3, insteadMul);
            console.log(inputValueArr);

        }    
    });
    inputValueArr.forEach(element => {
        console.log(element);
        if (element === '-') {
            let idxSub = inputValueArr.indexOf('-');
            let calSub = inputValueArr.slice(idxSub-1,idxSub+2);
            console.log(calSub);
            let insteadSub = calSub[0] - calSub[2];
            console.log(insteadSub);
            inputValueArr.splice(idxSub-1, 3, insteadSub);
            console.log(inputValueArr);
        }
    })
    inputValueArr.forEach(element => {
        if (element === '+') {
            let idxPlu = inputValueArr.indexOf('+');
            inputValueArr.splice(idxPlu,1);
            console.log(inputValueArr);
        }
    })
    result.innerText = inputValueArr.reduce(function add(sum, currValue){
        return sum + currValue;
    }, 0);
});