# 계산기 만들기
## 1. 결과 이미지
<img src="https://user-images.githubusercontent.com/68562176/103666282-c654fc80-4fb7-11eb-8ffa-3b087e834405.PNG" width="400px">
&nbsp;&nbsp; ▲ 1050px 미만일 때
<img src="https://user-images.githubusercontent.com/68562176/103666293-cb19b080-4fb7-11eb-9a7e-05f780c8ae8c.PNG" width = "400px">
&nbsp;&nbsp; ▲ 1050px 이상일 때

---
## 2. 어려웠던 점
#### 2-1. 버튼 누를때마다 누적하여 출력하기
버튼을 여러 개 누르면 누적하여 출력되어야 하는데, 하나씩만 나오거나 값이 나오지 않는 문제 발생
- 원인
1) 요소의 값을 value를 통해 가져와 새로 입력된 값을 더한 후, **innerText를 통하여 input요소의 값을 변경하려 함**
기존 코드
```
function print(num) {
    let progress = document.getElementById('progress').value;
    progress = progress + num;
    document.getElementById('progress').innerText = progress;
}
```
- 해결
1) input 요소의 값을 progress에 저장하고 입력받은 값을 더해서 다시 저장 → 출력
2) innerText를 value로 바꿈
- 공부해야 할 부분
1) DOM에 대한 이해 필요
2) 이벤트처리

#### 2-2. 연산자를 연속으로 눌렀을 때 => 가장 최근에 눌러진 연산자로 교체
- 원인
자바스크립트에서 NaN은 연산(==, ===)를 통해 확인할 수 없음
slice(-1)을 lastValue 변수에 저장 후, **Number(lastValue) == NaN을 통해 숫자인지 확인하려 함**
기존 코드
```
let lastValue = progress.innerText.slice(-1);
    if (num === '/' || num === '*' || num === '+' || num === '-' || num === '%') {
        if (Number(lastValue) == NaN) {
            console.log(Number(lastValue));
            inputValueArr.pop();
            progress.innerText = progress.innerText.slice(0,-1) + num;
        }
```
변경 후
```
let lastValue = progress.innerText.slice(-1);
    if (num === '/' || num === '*' || num === '+' || num === '-' || num === '%') {
        if (Number.isNaN(Number(lastValue))) {
            inputValueArr.pop();
            progress.innerText = progress.innerText.slice(0,-1) + num;
        }
```
- 해결
1) Number.isNaN()을 통해 NaN인지 확인하고 True일 경우, 배열과 progress에서 마지막 연산자를 지우고 새로운 연산자 추가

#### 2-3. 특정 연산자가 수행되지 않는 문제
- 원인
forEach를 통해 계속해서 element가 호출됨. 하지만 '/', '*', '-' 연산 후 배열 변경이 되면서 연산자를 건너뛰는 문제가 발생함
기존 코드
```
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
```
변경 후
```
inputValueArr.forEach(element => {
        console.log(element);
        if (element === '-') {
            let idxSub = inputValueArr.indexOf('-');
            let calSub = inputValueArr.slice(idxSub-1,idxSub+2);
            console.log(calSub);
            let insteadSub = calSub[0] - calSub[2];
            console.log(insteadSub);
            inputValueArr.splice(idxSub-1, 3, 0, insteadSub);
            console.log(inputValueArr);
        }
    })
```