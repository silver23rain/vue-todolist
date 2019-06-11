# Vue 인스턴스

## Vue 인스턴스 만들기
- `VM` : View model. Vue 인스턴스를 참조하기 위한 변수
- Vue 인스턴스를 인스턴스화 할 때는 options 객체 (data, methods 등) 전달해야 함
    - [옵션 전체 목록](https://kr.vuejs.org/v2/api/)
- 확장된 인스턴스를 만들수는 있으나 대개 템플릿에서 사용자 지정 엘리먼트로 선언적으로 작성하는 것이 좋음
- 모든 Vue 컴포넌트가 본질적으로 확장된 Vue 인스턴스

## 속성 / 메소드
- Vue 인스턴스는 `data`객체에 있는 모든 속성 => 프록시
- 데이터가 변경 -> 화면 re-render
- data에 있는 속성들은 인스턴스가 생성될 때 존재한 것들만 반응형
```javascript
var data = { a: 1 }

var vm = new Vue({
data: data //인스턴스가 생성될 때 존재한 것
});

// 인스턴스의 루트 수준 프로퍼티로 data의 프로퍼티들이 추가된다.
vm.a === 1;

// Proxy 처리로 인해 vm과 data는 서로 프로퍼티를 공유하는 것처럼 동작한다.
vm.a = 2; // data.a === 2
data.a = 3; // vm.a === 3

vm.b = '10' // data에 b가 추가 되어도 화면 render가 일어나지 않음
// 반응형 데이터가 아니여서 
``` 
## 인스턴스 라이프사이클 훅
- 루트 레벨로 사용가능

![라이프사이클 다이어그램](https://kr.vuejs.org/images/lifecycle.png)