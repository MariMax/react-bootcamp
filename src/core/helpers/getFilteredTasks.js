export const getFilteredTasks = (items, categoryId, showDone = false, searchTerm='') =>{
  return items
    .filter(i => i.categoryId === categoryId)
    //showDone === true show all tasks
    //showDone === false show only not executed tasks
    .filter(i => showDone || !i.done)
    .filter(i => i.title.includes(searchTerm));
}