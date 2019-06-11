# computed와 watch

## computed 속성
- 최상위 레벨이기 때문에 안에 정의한 key 이름으로 호출가능
- 기본적으로 getter 메소드 제공 
```html
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
</div>
```
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: '안녕하세요'
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split('').reverse().join('')
    }
  }
})
```
- computed 안에 정의한 메소드는 `=>`(arrow function) 사용을 주의해야 함.
    - this 가 바뀌기 때문

#### `computed` vs `methods` -> 가장 큰 차이점 캐싱
```javascript
    computed: {
      // 계산된 getter
      reversedMessage: function () {
        // `this` 는 vm 인스턴스를 가리킵니다.
        return this.message.split('').reverse().join('')
      },
      now1: function () {
        return Date.now()
      }
    },
    methods: {
        now2: function() {
            return Date.now()
        }
    }
```
- `computed` 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행
- `Date.now()` 처럼 인스턴스안에 아무런 의존이 없는 경우 값이 절대로 바뀌지 않음
- `methods` 속성은 호출하면 렌더링을 다시 할 때 마다 **항상** 함수를 실행

#### `computed` vs `watch`

#### `computed` 속성 setter
- `computed` 속성은 기본적으로 getter 함수 제공
- setter는 필요에 따라 작성하면 됨
```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
``` 
- 호출 방법
```javascript
vm.fullName = 'Park Eunbi' // setter 호출, 인스턴스의 firstName, lastName 이 업데이트 됨
```

## `watch` 속성
- 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용
- 해당 데이터 속성이 변경되면 호출 (감시? 하려는 data 속성의 key이름이랑 같아야 함)
```html
<div id="watch-example">
    <p>
    yes/no 질문을 물어보세요:
    <input v-model="question">
    </p>
    <p>{{ answer }}</p>
</div>
```
```javascript
  var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
      question: '',
      answer: '질문을 하기 전까지는 대답할 수 없습니다.'
    },
    watch: {
      // 질문이 변경될 때 마다 이 기능이 실행됩니다.
      question: function (newQuestion) {
        this.answer = '입력을 기다리는 중...'
        this.getAnswer()
      }
    },
    methods: {
        getAnswer: function () {
            this.answer = '대답 완료';
            //answer은 프록시데이터 이기 때문에 바로 render
        }
    }
  })
```