/**
 * todoList基础逻辑封装
*/
import { ref, watchEffect } from 'vue';

import * as storage from '../utils/storage'
export default function useTodoList() {
  const todoListRef = ref(storage.fetch())
  // 监听todoListRef变化，vue自定监听watchEffect中的响应式数据变化
  watchEffect(() => {
    storage.save(todoListRef.value)
    console.log('todoListRef :>> ', todoListRef.value);
  })
  return {
    todoListRef
  }
}