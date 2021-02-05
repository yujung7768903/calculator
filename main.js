'use strict'
const numberInput = document.getElementById('display');
const progress = document.getElementById('progress');
const clearButton = document.getElementById('clear');
const totalButton = document.getElementById('total');
const result = document.getElementById('result');

let inputValueArr = [];
//나누기와 곱하기 수행 후 값들이 담기게 될 배열
let resultArr = [];

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
        //연산자가 연속으로 입력이 되면 마지막에 입력된 연산자만 취급한다. 
        //하지만 )뒤에는 유일하게 연산자가 올 수 있다.
        if (lastValue === ')') {
            progress.innerText = progress.innerText + num;
        }
        //입력하는 연산자 앞에 이미 연산자가 있으면 새로 입력된 연산자로 교체
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
        inputValueArr.pop();
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
        inputValueArr.push(Number(numberInput.value), value1);
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

function divOperation(beforeArr) {
    let calArr = beforeArr;
    idxDiv = calArr.indexOf('/');
    console.log(`나누기 인덱스 번호 : ${idxDiv}`);
    while (idxDiv != -1) {
        let insteadSub = calArr[idxDiv-1] / calArr[idxDiv+1];
        calArr.splice(idxDiv-1, 3, insteadSub);
        console.log('나누기 연산 수행 후');
        console.log(calArr);
        idxDiv = calArr.indexOf('/');
        console.log(`인덱스 번호 : ${idxDiv}`);
    }
    resultArr = calArr;
}

function multOperation(beforeArr) {
    let calArr = beforeArr;
    idxMul = calArr.indexOf('*');
    console.log(`곱하기 인덱스 번호 : ${idxMul}`);
    while (idxMul != -1) {
        let insteadSub = calArr[idxMul-1] * calArr[idxMul+1];
        calArr.splice(idxMul-1, 3, insteadSub);
        console.log('곱하기 연산 수행 후');
        console.log(calArr);
        idxMul = calArr.indexOf('*');
        console.log(`인덱스 번호 : ${idxMul}`);
    }
    resultArr = calArr;
}

function subOperation(beforeArr) {
    let calArr = beforeArr;
    idxSub = calArr.indexOf('-');
    console.log('subOperation 함수 수행됨');
    console.log(calArr);
    console.log(`빼기 인덱스 번호 : ${idxSub}`);
    while (idxSub != -1) {
        let insteadSub = calArr[idxSub-1] - calArr[idxSub+1];
        calArr.splice(idxSub-1, 3, insteadSub);
        console.log('빼기 연산 수행 후');
        console.log(calArr);
        idxSub = calArr.indexOf('-');
        console.log(`인덱스 번호 : ${idxSub}`);
    }
    resultArr = calArr;
}

//곱하기랑 나누기 중 더 앞에 있는 것을 먼저 처리
function dmCompare(beforeArr) {
    console.log('dmCompare 함수 수행됨');
    let calArr = beforeArr;
    while (idxDiv != -1 && idxMul != -1){
        if (idxDiv < idxMul) {
            let insteadSub = calArr[idxDiv-1] / calArr[idxDiv+1];
            calArr.splice(idxDiv-1, 3, insteadSub);
            console.log(`연산 수행 전 나누기 인덱스 번호 : ${idxDiv}`);
            console.log('나누기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(calArr);
        } 
        else {
            let insteadSub = calArr[idxMul-1] * calArr[idxMul+1];
            calArr.splice(idxMul-1, 3, insteadSub);
            console.log(`연산 수행 전 곱하기 인덱스 번호 : ${idxMul}`);
            console.log('곱하기 연산 수행 후');
            //연산 수행 후 배열의 요소와 인덱스 변경됨
            console.log(calArr);
        }
        //배열 변경 후 인덱스 다시 검색
        idxDiv = calArr.indexOf('/');
        idxMul = calArr.indexOf('*');
    }
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation(calArr);
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation(calArr);
    }
}

function divNmul(beforeArr) {
    console.log('divNmul 함수 수행됨');
    console.log(beforeArr);
    idxMul = beforeArr.indexOf('*');
    idxDiv = beforeArr.indexOf('/');
    if (idxDiv == -1 && idxMul != -1) {
        //곱하기 연산하기
        multOperation(beforeArr);
    }
    else if (idxDiv != -1 && idxMul == -1) {
        //나누기 연산하기
        divOperation(beforeArr);
    }
    else if (idxDiv != -1 && idxMul != -1) {
        //인덱스 비교해서 더 앞에 있는 연산자부터 수행하기
        dmCompare(beforeArr);
    }
    else {
        //나누기와 곱하기가 없을 때
        //빼기의 파라미터 값으로 넣을 resultArr는 처음 들어왔던 그대로 beforeArr 유지
        resultArr = beforeArr;
    }
}

//괄호 안 배열 먼저 계산하는 함수
function bracketFirst() {
    //괄호 앞에 바로 숫자가 있을 경우 괄호 안을 먼저 계산하고 그 후에 곱하기로 처리
    let multipleNum = 1;
    //'('괄호 앞에 연산자가 있는 경우에는 true, 숫자가 있는 경우에는 false
    while (idxFirst != -1 && idxSecond != -1) {
        let trueorFalse = Number.isNaN(Number(inputValueArr[idxFirst-1])); 
        console.log(inputValueArr[idxFirst-1]);
        console.log((Number(inputValueArr[idxFirst-1])));
        if (trueorFalse === false) {
            multipleNum = Number(inputValueArr[idxFirst-1]);
            console.log(multipleNum);
            inputValueArr.splice(idxFirst-1, 1);
            idxFirst = inputValueArr.indexOf('(');
            idxSecond = inputValueArr.indexOf(')');
        }   
        //먼저 계산할 괄호 안 배열 firstCalArr
        firstCalArr = inputValueArr.slice(idxFirst+1, idxSecond);
        console.log(`괄호 안 배열 : ${firstCalArr}`);
        divNmul(firstCalArr);
        subOperation(resultArr);
        console.log(`괄호 안 나누기, 곱하기, 빼기 후의 배열 = ${resultArr}`);
        resultArr.forEach(element => {
            if (element === '+') {
                let idxPlu = resultArr.indexOf('+');
                resultArr.splice(idxPlu,1);
                console.log(resultArr);
            }
        })
        let afterBracket = resultArr.reduce(function add(sum, currValue){
            return sum + currValue;
        }, 0);
        //괄호 안의 값을 지우고 계산한 결과 넣기
        let removeNum = idxSecond - idxFirst + 1;
        inputValueArr.splice(idxFirst, removeNum, multipleNum * afterBracket);
        console.log(`괄호 값 계산 후 inputvalueArr = ${inputValueArr}`);
        idxFirst = inputValueArr.indexOf('(');
        idxSecond = inputValueArr.indexOf(')');
    }
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
    idxFirst = inputValueArr.indexOf('(');
    idxSecond = inputValueArr.indexOf(')');
    if (idxFirst != -1) {
        bracketFirst(inputValueArr);
    }
    //나누기와 곱하기 처리
    divNmul(inputValueArr);
    //빼기 처리
    subOperation(resultArr);
    console.log(`연산 수행 후 배열 = ${resultArr}`);
    //더하기 처리
    resultArr.forEach(element => {
        if (element === '+') {
            let idxPlu = resultArr.indexOf('+');
            resultArr.splice(idxPlu,1);
            console.log(resultArr);
        }
    })
    result.innerText = resultArr.reduce(function add(sum, currValue){
        return sum + currValue;
    }, 0);
});

