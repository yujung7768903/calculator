'use strict'
const numberInput = document.getElementById('display');
const progress = document.getElementById('progress');
const clearButton = document.getElementById('clear');
const totalButton = document.getElementById('total');
const result = document.getElementById('result');

let inputValueArr = [];

let idxDiv;
let idxMul;
let idxSub;
let idxFirst;
let idxSecond;
let firstCalArr;


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
}

function divOperation() {
    idxDiv = inputValueArr.indexOf('/');
    console.log(inputValueArr);
    console.log(`나누기 인덱스 번호 : ${idxDiv}`);
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
    idxMul = inputValueArr.indexOf('*');
    console.log(`곱하기 인덱스 번호 : ${idxMul}`);
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
    idxSub = inputValueArr.indexOf('-');
    console.log('subOperation 함수 수행됨');
    console.log(inputValueArr);
    console.log(`빼기 인덱스 번호 : ${idxSub}`);
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
function dmCompare() {
    console.log('dmCompare 함수 수행됨')
    while (idxDiv != -1 && idxMul != -1){
        if (idxDiv < idxMul) {
            let insteadSub = inputValueArr[idxDiv-1] / inputValueArr[idxDiv+1];
            inputValueArr.splice(idxDiv-1, 3, insteadSub);
            console.log(`연산 수행 전 나누기 인덱스 번호 : ${idxDiv}`);
            console.log('나누기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(inputValueArr);
        } 
        else {
            let insteadSub = inputValueArr[idxMul-1] * inputValueArr[idxMul+1];
            inputValueArr.splice(idxMul-1, 3, insteadSub);
            console.log(`연산 수행 전 곱하기 인덱스 번호 : ${idxMul}`);
            console.log('곱하기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(inputValueArr);
        }
        //배열 변경 후 인덱스 다시 검색
        idxDiv = inputValueArr.indexOf('/');
        idxMul = inputValueArr.indexOf('*');


    }
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation();
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation();
    }
}

function divNmul() {
    console.log('divNmul 함수 수행됨');
    idxMul = inputValueArr.indexOf('*');
    idxDiv = inputValueArr.indexOf('/');
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
        dmCompare();
    }
}

function bracketFirst() {
    idxFirst = inputValueArr.indexOf('(')
    idxSecond = inputValueArr.indexOf(')')
    firstCalArr = inputValueArr.slice(idxFirst+1, idxSecond);
    console.log(`괄호 안 배열 : ${firstCalArr}`);
}

function clear() {
    progress.innerText = null;
    numberInput.value = null;
    result.innerText = null;
    inputValueArr = [];
}

clearButton.addEventListener('click', clear());

totalButton.addEventListener('click', () => {
    let lastValue = progress.innerText.slice(-1);
    //마지막 값이 연산자인지 확인 후 연산자이면 삭제 후 연산 수행
    if (Number.isNaN(Number(lastValue)) && lastValue != ')') {
        progress.innerText = progress.innerText.slice(0,-1);
        inputValueArr.pop();
    }
    else {
        //마지막 값이 연산자가 아니라면 string 타입으로 들어온 숫자를 Number로 변환해서 배열에 저장
        inputValueArr.push(Number(numberInput.value));
    }
    console.log(`연산 수행 전 inputValue = ${inputValueArr}`);
    //괄호 먼저 처리
    bracketFirst();
    //나누기와 곱하기 처리
    divNmul();
    //빼기 처리
    subOperation();
    console.log(`연산 수행 후 inputValue = ${inputValueArr}`);
    //더하기 처리
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

