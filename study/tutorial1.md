# Vue Tutorial

- vue 공식 홈페이지 따라 작성

### 템플릿 구문

```html
<p>{{ message }}</p> <!-- Vue객체 data.message가 bind  -->
```
```javascript
app1 = new Vue({
    el: '#app',
    data: {
        message: 'hello, World'
    }
})
```
- data 는 Vue 객체의 root 레벨이여서 data안에 key는 Vue.`key이름` 으로 console 창에서 접근 가능
    - ex) app1.message로 console 창에서 데이터를 조회하고 수정 할 수 있음

### `v-bind` (디렉티브)
- 디렉티브 : vue에서 제공하는 특수 속성
- DOM에 렌더링된 특수한 반응형 동작을 함 

```html
<span v-bind:title="message"> <!-- title속성 -->
```

## 조건문 & 반목문
#### 조건문
```html
<p v-if="seen">이제 나를 볼 수 있어요</p>
```
- `v-if` 디렉티브에 boolean 값으로 보일지 말지를 정할 수 있음

### 반복문
- `v-for` 디렉티브를 통해 객체 bind

```html
<li v-for="todo in todos"> <!-- for in loop -->
    {{ todo.text }} <!-- todos 배열안 객체 ex)todos[0].text 할당 -->
</li>
```

```javascript
data: {
    todos: [
        { text: 'JavaScript 배우기' },
        { text: 'Vue 배우기' },
        { text: '무언가 멋진 것을 만들기' }
    ]
}
```
- 콘솔창에서 `app4.todos.push({text:'튜토리얼 따라하기'})` 입력했을 때, 데이터가 바뀌는것을 확인할 수 있음
    - 데이터가 바로 반영되는 이유 => data 안에 객체들이 *프록시객체* 이기 때문

## 사용자 입력 핸들링
- `v-on` 디렉티브를 사용해 Vue 인스턴스 methods 안 메소드를 호출할 수 있음

### <b>양방향 바인딩</b>
- `v-model` 디렉티브를 사용해 양방향 바인딩이 가능
    - 객체를 직접수정, DOM 조작으로 인스턴스의 객체 값이 변경
```html
 <input v-model="message">
```

## 컴포넌트 시스템
![컴포넌트 시스템](https://kr.vuejs.org/images/components.png)
- 컴포넌트 : 미리 정의된 옵션을 가진 Vue 인스턴스

- 컴포넌트 등록 방법
```html
<div id="app-7">
  <ol>
    <!-- 
      이제 각 todo-item 에 todo 객체를 제공합니다.
      화면에 나오므로, 각 항목의 컨텐츠는 동적으로 바뀔 수 있습니다. 
      또한 각 구성 요소에 "키"를 제공해야합니다 (나중에 설명 됨).
     -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id">
    </todo-item>
  </ol>
</div>
```
```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```