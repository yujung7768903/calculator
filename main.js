'use strict'
const numberInput = document.getElementById('display');
const progress = document.getElementById('progress')
const percentageButton = document.getElementById('percentage');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multOperation');
const addButton = document.getElementById('add');
const substractionButton = document.getElementById('substraction');
const totalButton = document.getElementById('total');
const result = document.getElementById('result')

let total;
let temp;
let operator = "";
let progressValue;
let inputValueArr = [];

let idxDiv = inputValueArr.indexOf('/');
let idxMul = inputValueArr.indexOf('*');
let idxSub = inputValueArr.indexOf('-');


function print(num) {
    let lastValue = progress.innerText.slice(-1);
    if (num === '/' || num === '*' || num === '+' || num === '-' || num === '%') {
        if (Number.isNaN(Number(lastValue))) {
            inputValueArr.pop();
            progress.innerText = progress.innerText.slice(0,-1) + num;
        }
        else {
            inputValueArr.push(Number(numberInput.value));
            progress.innerText = progress.innerText + num;
        }
        inputValueArr.push(num);
        numberInput.value = null;
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

function divOperation() {
    console.log(inputValueArr);
    console.log(`인덱스 번호 : ${idxDiv}`);
    while (idxDiv != -1) {
        let insteadSub = inputValueArr[idxDiv-1] / inputValueArr[idxDiv+1];
        inputValueArr.splice(idxDiv-1, 3, insteadSub);
        console.log('나누기 연산 수행 후');
        console.log(inputValueArr);
        idxDiv = inputValueArr.indexOf('/');
        console.log(`인덱스 번호 : ${idxDiv}`);
    }
}

function multOperation() {
    console.log(`인덱스 번호 : ${idxMul}`);
    while (idxMul != -1) {
        let insteadSub = inputValueArr[idxMul-1] * inputValueArr[idxMul+1];
        inputValueArr.splice(idxMul-1, 3, insteadSub);
        console.log('곱하기 연산 수행 후');
        console.log(inputValueArr);
        idxMul = inputValueArr.indexOf('*');
        console.log(`인덱스 번호 : ${idxMul}`);
    }
}

function subOperation() {
    console.log(`인덱스 번호 : ${idxSub}`);
    console.log(inputValueArr);
    while (idxSub != -1) {
        let insteadSub = inputValueArr[idxSub-1] - inputValueArr[idxSub+1];
        inputValueArr.splice(idxSub-1, 3, insteadSub);
        console.log('빼기 연산 수행 후');
        console.log(inputValueArr);
        idxSub = inputValueArr.indexOf('-');
        console.log(`인덱스 번호 : ${idxSub}`);
    }
}

//곱하기랑 나누기 중 더 앞에 있는 것을 먼저 처리
function dmcompare() {
    while (idxDiv != -1 && idxMul != -1){
        if (idxDiv < idxMul) {
            let insteadSub = inputValueArr[idxDiv-1] / inputValueArr[idxDiv+1];
            inputValueArr.splice(idxDiv-1, 3, insteadSub);
            console.log('나누기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(inputValueArr);
            idxDiv = inputValueArr.indexOf('/');
            console.log(`인덱스 번호 : ${idxDiv}`);
        } 
        else {
            let insteadSub = inputValueArr[idxMul-1] * inputValueArr[idxMul+1];
            inputValueArr.splice(idxMul-1, 3, insteadSub);
            console.log('곱하기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(inputValueArr);
            idxMul = inputValueArr.indexOf('*');
            console.log(`인덱스 번호 : ${idxMul}`);
        }
    }
}

function divNmul() {
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation();
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation();
    }
    else if (idxDiv != -1 && idxMul != -1) {
        //인덱스 비교해서 더 앞에 있는 연산자부터 수행하기
        dmcompare();
    }
}

/*
totalButton.addEventListener('click', () => {
    let lastValue = progress.innerText.slice(-1);
    if (Number(lastValue) === NaN) {
        progress.innerText = progress.innerText.slice(0,-1);
        inputValueArr.pop();
    }
    inputValueArr.push(Number(numberInput.value));
    console.log(inputValueArr);
    inputValueArr.forEach(element => {
        console.log(element);
        if (element === '/') {
            idxDiv = inputValueArr.indexOf('/');
            let calDiv = inputValueArr.slice(idxDiv-1,idxDiv+2);
            console.log(calDiv);
            let insteadDiv = calDiv[0] / calDiv[2];
            inputValueArr.splice(idxDiv-1, 3, 0, insteadDiv);
            console.log(inputValueArr);

        }
        else if (element === '*') {
            idxMul = inputValueArr.indexOf('*');      
            let calMul = inputValueArr.slice(idxMul-1,idxMul+2);
            console.log(calMul);
            let insteadMul = calMul[0] * calMul[2];
            inputValueArr.splice(idxMul-1, 3, 0, insteadMul);
            console.log(inputValueArr);
        }    
    });
    inputValueArr.forEach(element => {
        console.log(element);
        if (element === '-') {
            //let idxSub = inputValueArr.indexOf('-');
            let calSub = inputValueArr.slice(idxSub-1,idxSub+2);
            console.log(calSub);
            //let insteadSub = calSub[0] - calSub[2];
            console.log(insteadSub);
            inputValueArr.splice(idxSub-1, 3, 0, insteadSub);
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
*/