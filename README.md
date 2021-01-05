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
해당 코드
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
