const getLocalStrage = () => {
    return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []; 
}

const addLocalStorage = (data) => {
    const todoListStorage = getLocalStrage();
    todoListStorage.push(data);
    localStorage.setItem('todoList', JSON.stringify(todoListStorage));
}

const updateLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(app.todoList));
}

Vue.component('todo-context', {
    props: ['todo'],
    template: '<input type="checkbox" v-model="todo.completed">',
    updated() {
        updateLocalStorage()
    },
})

var app = new Vue({
    el: '#app',
    data: {
        todoInput: '',
        todoContext: '회사',
        todoList: getLocalStrage(),
    },
    methods: {
        addTodo: function() {
            if(this.todoInput.length === 0) {
                return;
            }
            const data = {
                title: this.todoInput,
                completed: false,
                context: this.todoContext
            }
            this.todoList.push(data);
            addLocalStorage(data);

            this.todoInput =''
            this.todoContext = '회사'
        },
    },

})
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then((reg) => {
            console.log('Service worker registered.', reg);
          });
    });
  }