<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input v-model="newItemRef" class="new-todo" @keyup.enter="onAddNewItem" autocomplete="off"
          placeholder="What needs to be done?" />
      </header>
      <section class="main" v-show="todoListRef.length > 0">
        <input id="toggle-all" class="toggle-all" type="checkbox" :checked="allCompletedRef"
          @click="toggleAll($event.target.checked)" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li :class="['todo', todoEditingRef?.id === todo.id && 'editing']" v-for="todo in filteredTodoListRef"
            :key="todo.id">
            <div class="view">
              <input :class="['toggle', todo.completed && 'completed']" type="checkbox" v-model="todo.completed" />
              <label @dblclick="todoEdit(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="todoRemove(todo)"></button>
            </div>
            <!-- 响应esc键 -->
            <input class="edit" type="text" v-model.trim="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)" />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoListRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainRef }}</strong>
          <span>item{{ remainRef <= 1 ? '' : 's' }} left</span>
          </span>
          <ul class="filters">
            <li><a :href="'#/' + LIST_TYPE.ALL" :class="typeRef === LIST_TYPE.ALL && 'selected'">All</a></li>
            <li><a :href="'#/' + LIST_TYPE.ACTIVE" :class="typeRef === LIST_TYPE.ACTIVE && 'selected'">Active</a></li>
            <li><a :href="'#/' + LIST_TYPE.COMPLETED" :class="typeRef === LIST_TYPE.COMPLETED && 'selected'">Completed</a>
            </li>
          </ul>
          <button class="clear-completed" v-show="remainCompletedRef" @click="clearCompleted">
            Clear completed
          </button>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { LIST_TYPE } from './enums';
import {
  useAddTodoList,
  useTodoList,
  useFilter,
  useEdit,
} from './composition'

const { todoListRef } = useTodoList()
const {
  newItemRef,
  onAddNewItem
} = useAddTodoList(todoListRef)
const {
  typeRef,
  remainRef,
  filteredTodoListRef,
  remainCompletedRef,
  allCompletedRef,
  clearCompleted
} = useFilter(todoListRef)
const {
  todoEditingRef,
  todoRemove,
  toggleAll,
  todoEdit,
  doneEdit,
  cancelEdit
} = useEdit(todoListRef)
</script>