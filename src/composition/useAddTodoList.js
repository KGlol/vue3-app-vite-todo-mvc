/**
 * todoList添加操作封装
*/
import { ref } from 'vue';
import { taskModify } from '../utils/utils';
export default function useAddTodoList(todoListListRef) {
  const newItemRef = ref('')

  const onAddNewItem = () => {
    const content = newItemRef.value?.trim()
    if (content) {
      const newTaskObj = taskModify(content)
      newTaskObj && todoListListRef.value.push(newTaskObj)
    }
    // 重置
    newItemRef.value = ''
  }
  return {
    newItemRef,
    onAddNewItem
  }
}