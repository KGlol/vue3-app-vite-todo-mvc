const TODO_LIST = 'toDoList'
function fetch() {
  return JSON.parse(localStorage.getItem(TODO_LIST)) || []
}

function save(data) {
  localStorage.setItem(TODO_LIST, JSON.stringify(data))
}

function remove() {
  return localStorage.removeItem(TODO_LIST)
}

function removeItem(key, index) {
  const list = fetch(key)
  list.splice(index, index)
  storage(list)
}

export {
  fetch,
  save,
  removeItem,
  remove
}