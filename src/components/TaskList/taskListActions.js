import { v4 } from 'uuid';

export const SET_TASKS_DATA = `SET_TASKS_DATA`;
export const SELECT_TASK = `SELECT_TASK`;
export const SET_TASK_STATE = `SET_TASK_STATE`;
export const ADD_TASK = `ADD_TASK`;
export const MOVE_TASK = 'MOVE_TASK';

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

export const addTask = (categoryId, taskName) => ({
  type: ADD_TASK,
  payload: {
    id: v4(),
    title: taskName,
    description: '',
    categoryId,
    done: false
  },
});

export const changeTaskState = (taskId, state) => ({
  type: SET_TASK_STATE,
  payload: {taskId,state}
});

