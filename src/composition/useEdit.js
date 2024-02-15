// 编辑任务列表逻辑封装ß
import { ref } from 'vue';
export default function useEdit(todoListRef) {
  // 正在编辑的任务
  const todoEditingRef = ref(null)

  // 临时保存之前的title，在edit输入为空的时候，还原之前的值
  let prevTitle = ''
  const todoRemove = (todo) => {
    const index = todoListRef.value.indexOf(todo)
    todoListRef.value.splice(index, 1)
  }
  const todoEdit = (todo) => {
    prevTitle = todo.title
    todoEditingRef.value = todo
  }
  const doneEdit = (todo) => {
    // 在edit输入为空的时候，还原之前的title
    if (!todoEditingRef.value?.title) {
      todoRemove(todo)
    }
    todoEditingRef.value = null
  }
  const cancelEdit = (todo) => {
    todo.title = prevTitle
    todoEditingRef.value = null
  }
  const toggleAll = (complete) => {
    todoListRef.value.forEach(todo => {
      todo.completed = complete
    })
  }

  return {
    todoEditingRef,
    todoRemove,
    toggleAll,
    todoEdit,
    doneEdit,
    cancelEdit
  }
}