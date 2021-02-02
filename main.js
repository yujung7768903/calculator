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
let lastValue;

function print(num) {
    lastValue = progress.innerText.slice(-1);
    if (num === '(') {
        console.log('firstBracket 함수 수행됨');
        firstBracket('(');
        console.log(`(입력 후 배열 : ${inputValueArr}`);
    }
    else if (num === ')') {
        console.log('secondBracket 함수 수행됨');
        secondBracket(')');
        console.log(`)입력 후 배열 : ${inputValueArr}`);
    }
    else if (num === '/' || num === '*' || num === '+' || num === '-' || num === '%') {
        if (lastValue === ')') {
            inputValueArr.push(num);
            progress.innerText = progress.innerText + num;
        }
        else if (Number.isNaN(Number(lastValue))) {
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

// '(' 들어 왔을 때
function firstBracket(value1) {
    lastValue = progress.innerText.slice(-1);
    //앞이 숫자면 곱하기 연산자가 있는 것으로 간주
    if (0 <= Number(lastValue) && Number(lastValue) <= 9) {
        inputValueArr.push(Number(numberInput.value),'*', value1);
        numberInput.value = null;
    }
    else {
        inputValueArr.push(value1);
    }
    progress.innerText = progress.innerText + value1;
}

// ')' 들어 왔을 때
function secondBracket(value2) {
    //앞이 연산자일 때 -> 연산자를 지우고 ')'삽입
    if (Number.isNaN(Number(lastValue))) {
        inputValueArr.pop();
        progress.innerText = progress.innerText.slice(0,-1) + value2;
    }
    //연산자가 아닌 숫자일 때 
    else {
        inputValueArr.push(Number(numberInput.value));
        progress.innerText = progress.innerText + value2;
    }
    inputValueArr.push(value2);
    numberInput.value = null;
}

function divOperation(arr) {
    idxDiv = arr.indexOf('/');
    console.log(arr);
    console.log(`나누기 인덱스 번호 : ${idxDiv}`);
    while (idxDiv != -1) {
        let insteadSub = arr[idxDiv-1] / arr[idxDiv+1];
        arr.splice(idxDiv-1, 3, insteadSub);
        console.log('나누기 연산 수행 후');
        console.log(arr);
        idxDiv = arr.indexOf('/');
        console.log(`인덱스 번호 : ${idxDiv}`);
    }
}

function multOperation(arr) {
    idxMul = arr.indexOf('*');
    console.log(`곱하기 인덱스 번호 : ${idxMul}`);
    while (idxMul != -1) {
        let insteadSub = arr[idxMul-1] * arr[idxMul+1];
        arr.splice(idxMul-1, 3, insteadSub);
        console.log('곱하기 연산 수행 후');
        console.log(arr);
        idxMul = arr.indexOf('*');
        console.log(`인덱스 번호 : ${idxMul}`);
    }
}

function subOperation(arr) {
    idxSub = arr.indexOf('-');
    console.log('subOperation 함수 수행됨');
    console.log(arr);
    console.log(`빼기 인덱스 번호 : ${idxSub}`);
    while (idxSub != -1) {
        let insteadSub = arr[idxSub-1] - arr[idxSub+1];
        arr.splice(idxSub-1, 3, insteadSub);
        console.log('빼기 연산 수행 후');
        console.log(arr);
        idxSub = arr.indexOf('-');
        console.log(`인덱스 번호 : ${idxSub}`);
    }
}

//곱하기랑 나누기 중 더 앞에 있는 것을 먼저 처리
function dmCompare(arr) {
    console.log('dmCompare 함수 수행됨')
    while (idxDiv != -1 && idxMul != -1){
        if (idxDiv < idxMul) {
            let insteadSub = arr[idxDiv-1] / arr[idxDiv+1];
            let newArr = arr.splice(idxDiv-1, 3, insteadSub);
            console.log(`연산 수행 전 나누기 인덱스 번호 : ${idxDiv}`);
            console.log('나누기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(newArr);
        } 
        else {
            let insteadSub = arr[idxMul-1] * arr[idxMul+1];
            let newArr arr.splice(idxMul-1, 3, insteadSub);
            console.log(`연산 수행 전 곱하기 인덱스 번호 : ${idxMul}`);
            console.log('곱하기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(arr);
        }
        //배열 변경 후 인덱스 다시 검색
        idxDiv = arr.indexOf('/');
        idxMul = arr.indexOf('*');
    }
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation(arr);
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation(arr);
    }
}

function divNmul(arr) {
    console.log('divNmul 함수 수행됨');
    idxMul = arr.indexOf('*');
    idxDiv = arr.indexOf('/');
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation(arr);
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation(arr);
    }
    else if (idxDiv != -1 && idxMul != -1) {
        //인덱스 비교해서 더 앞에 있는 연산자부터 수행하기
        dmCompare(arr);
    }
}

//괄호 안 배열 먼저 계산하는 함수
function bracketFirst() {
    idxFirst = inputValueArr.indexOf('(');
    idxSecond = inputValueArr.indexOf(')');
    firstCalArr = inputValueArr.slice(idxFirst+1, idxSecond);
    inputValueArr.splice(idxFirst,1);
    inputValueArr.splice(idxSecond-1,1);
    console.log(`괄호 안 배열 : ${firstCalArr}`);

}

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

