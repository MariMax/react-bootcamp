export const SET_TASKS_DATA = `SET_TASKS_DATA`;
export const SHOW_TASKS = `SHOW_TASKS`;
export const SELECT_TASK = `SELECT_TASK`;
export const FINISH_TASK = `FINISH_TASK`;

export const showTasks = (categoryId) => ({
  type: SHOW_TASKS,
  payload: categoryId,
});

export const setData = (tasksArray) => ({
  type: SET_TASKS_DATA,
  payload: tasksArray.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {}),
});

export const selectTask = (taskId) => ({
  type: SELECT_TASK,
  payload: taskId,
});

export const finishTask = (taskId) => ({
  type: FINISH_TASK,
  payload: taskId,
});

