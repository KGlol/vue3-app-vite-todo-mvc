/**列表过滤逻辑封装 */
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { LIST_TYPE } from '../enums';

export default function useFilter(todoListRef) {
  // 当前列表显示类型
  const typeRef = ref(LIST_TYPE.ALL)
  // hash变化处理函数
  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/, '')
    if (Object.values(LIST_TYPE).includes(hash)) {
      typeRef.value = hash
    } else {
      typeRef.value = LIST_TYPE.ALL
    }
  }
  // 监听hashchange事件，切换显示
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange)
  })

  // 计算剩余任务
  const remainRef = computed(() => {
    return todoListRef.value.reduce((sum, todo) => {
      return sum + (todo.completed ? 0 : 1)
    }, 0)
  })

  // 计算当前类型任务列表
  const filteredTodoListRef = computed(() => {
    switch (typeRef.value) {
      case LIST_TYPE.ACTIVE:
        return todoListRef.value.filter(todo => !todo.completed)
      case LIST_TYPE.COMPLETED:
        return todoListRef.value.filter(todo => todo.completed)
      default:
        return todoListRef.value
    }
  })

  // 是否还有已经完成
  const remainCompletedRef = computed(() => todoListRef.value.some(todo => todo.completed))
  // 是否全部已完成
  const allCompletedRef = computed(() => todoListRef.value.every(todo => todo.completed))

  // 清除已完成
  const clearCompleted = () => {
    todoListRef.value.forEach(todo => {
      todo.completed && (todo.completed = false)
    })
  }

  return {
    typeRef,
    remainRef,
    filteredTodoListRef,
    remainCompletedRef,
    allCompletedRef,
    clearCompleted
  }
}