<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <select class="custom-select" v-model="todoContext">
                    <option value="회사">회사</option>
                    <option value="집">집</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <input type="text" class="form-control" placeholder="할일을 입력해 주세요" v-model="todoInput">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" v-on:click="addTodo">저장</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        완료
                    </th>
                    <th>분류</th>
                    <th style="width:80%">해야 할 일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todos, index) in todoList" :key="todos">
                    <td>
                        <todo-context :todo ="todos" :index="index"/>
                    </td>
                    <td>
                        <span class="badge"
                        :class="{'badge-secondary': todos.completed, 'badge-info': !todos.completed}">
                            {{ todos.context }}
                        </span>
                    </td>
                    <td :class="{completed: todos.completed}">{{ todos.title }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style >
    * {
        font-size: 18px;
    }
    body {
        padding: 45px;
    }
    table {
        margin-top: 15px;
    }
    .completed {
        color: #eee;
        text-decoration: line-through 
    }
</style>
<script>
import Vue from 'vue'

const getLocalStrage = () => {
    console.log('dd')
    return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []; 
}

const addLocalStorage = (data) => {
    const todoListStorage = getLocalStrage();
    todoListStorage.push(data);
    console.log(data)
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

export default {
    name: 'TodoList',
    data() {
        return {
            todoInput: '',
            todoContext: '회사',
            todoList: getLocalStrage(),
        }
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
}
</script>
