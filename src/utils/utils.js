/**
 * @description: 一些工具函数
 */

/**
 * @description: 生成随机id，时间戳+四位随机字符串
 * @return {string}
 */
export function generateRandomId() {
  // 生成随机数，转化成16进制，截取小数点后四位(默认)
  return Date.now() + Math.random().toString(16).slice(2, 6)
}

export function taskModify(title) {
  if (!title) return
  return {
    title,
    id: generateRandomId(),
    completed: false
  }
}