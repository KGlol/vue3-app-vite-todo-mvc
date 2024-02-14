<template>
  <!-- 模版中可直接使用countRef，vue做了优化 -->
  <button @click="increase">{{ countRef }}</button>
  <button @click="count++">{{ count }}</button>
</template>

<script>

import { reactive, ref, toRefs } from 'vue'
// !高内聚表现
function useCount(initialNum = 0) {
  const countRef = ref(initialNum)
  const state = reactive({
    count: initialNum,
  })
  // ! setup中必须使用.value，因为setup中countRef还是对象
  const increase = () => { countRef.value++ }
  return {
    countRef,
    ...toRefs(state),
    increase
  }
}
/**
 * composition api的写法更加高聚合，
 * 逻辑代码并不依赖于setup，所以其实甚至可以直接将相关的逻辑直接取出，封装到其他文件内
 * 
 *  */
export default {
  /**
   * 1. setup函数将在生命周期之前执行
   * 2. setup之内不能直接访问this,this -> undefined
   *  */
  setup() {
    // 一个规范，ref生成的响应式数据，要以命名ref结尾
    const countRef = ref(0)
    const state = reactive({
      count: 0,
    })
    // ! setup中必须使用.value，因为setup中countRef还是对象
    const increase = () => { countRef.value++ }
    return {
      ...toRefs(state),
      countRef,
      increase,
      // ...useCount()
    }
  }
}
</script>
