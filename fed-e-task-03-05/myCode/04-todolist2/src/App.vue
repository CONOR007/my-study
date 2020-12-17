<template>
  <div>
    <section id="app" class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autocomplete="off"
          autofocus
          v-model="input"
          @keyup.enter="addTodo"
          @blur="addTodo"
          >
      </header>
      <section class="main" >
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li v-for="(todo, index) in filtedTodos" :key="index" :class="{ editing: editingTodo === todo, completed: todo.completed }">
            <div class="view" v-if="editingTodo !== todo" @click="todo.completed = !todo.completed">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{todo.text}}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="beforeEditingText"
              @blur="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              v-editing-focus="editingTodo === todo"
              v-else
              >
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">
          <strong>{{ incomplete > 0 ? incomplete : '' }}</strong>{{ incomplete > 0 ? 'item left' : ''}}
        </span>
        <ul class="filters">
          <li><a href="#/all">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="clearCompleted" v-show="incomplete < todos.length">
          Clear completed
        </button>
      </footer>
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <!-- Change this out with your name and url ↓ -->
      <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>

<script>
import './assets/index.css'
import useLocalStorage from './util/useLocalStorage'
import {ref,computed,onMounted,onUnmounted,watchEffect} from 'vue'
const strorage = useLocalStorage();
// 1.添加代办事项
const useAdd = (todos) =>{
  const input = ref('');
  const addTodo = () => {
    const text = input.value && input.value.trim();
    if(!text.length) return;
    todos.value.unshift(
      {
        text,
        completed:false,
      }
    )
    input.value = '';
  };
  return {
    input,
    addTodo
  }
}
// 2.删除代办事项
const useRemove = todos => {
  const removeTodo = (todo) => {
    const index = todos.value.indexOf(todo);
    todos.value.splice(index,1);
  };
  const clearCompleted = () => {
    todos.value = todos.value.filter(x=>!x.completed);
  }
  return {
    removeTodo,
    clearCompleted,
  }
}
// 3.编辑待办项
const useEdit = ({removeTodo,clearCompleted}) => {
  const editingTodo = ref(null);
  const beforeEditingText = ref('');
  const editTodo = todo => {
    beforeEditingText.value = todo.text;
    editingTodo.value = todo;
  }
  const doneEdit = todo => {
    if(!beforeEditingText.value.trim().length){
      removeTodo(todo)
    }else {
      todo.text = beforeEditingText.value;
      editingTodo.value = null;
    }
  }
  const cancelEdit = () => {
    editingTodo.value = null;
  }
  return {
    editingTodo,
    beforeEditingText,
    editTodo,
    cancelEdit,
    doneEdit,
    removeTodo,
    clearCompleted,
  }
}
// 4.切换待办事项状态
const useToggle = todos => {
  const allDone = computed({
    get(){
      return !todos.value.filter(todo=>!todo.completed).length
    },
    set(value){
      todos.value.forEach(item => {
        item.completed = value;
      });
    }
  })
  let hash = ref('all');
  const filter = {
    all : todos=>todos.value,
    active : todos=>todos.value.filter(todo => !todo.completed),
    completed : todos=>todos.value.filter(todo => todo.completed),
  }
  const onHashChange = () => {
    const hashVal = window.location.hash.replace('#/','');
    if(filter[hashVal]){
      hash.value = hashVal;
    }else{
      hash.value = 'all';
    }
  }
  const filtedTodos = computed(()=>{
    return filter[hash.value](todos);
  })
  const incomplete = computed(()=>{
    return filter.active(todos).length;
  })
  onMounted(() => {
    window.addEventListener('hashchange',onHashChange);
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange',onHashChange)
  })
  return {
    allDone,
    filtedTodos,
    hash,
    incomplete,
  }
}

// 5.存储待办事项
const useStorage = () => {
  const key = 'TODOSKEY';
  const todos = ref(strorage.getItem(key) || []);
  watchEffect(()=>{
    strorage.setItem(key,todos.value);
  })
  return todos
}

export default {
  name: 'App',
  setup() {
    const todos = useStorage();
    return {
      todos,
      ...useAdd(todos),
      ...useToggle(todos),
      ...useEdit(useRemove(todos)),
    }
  },
  directives:{
    editingFocus(el,{value}){
      if(value) el.focus();
    }
  }
}
</script>

<style>
</style>
