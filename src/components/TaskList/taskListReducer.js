import {
  SET_TASKS_DATA,
  ADD_TASK,
  SET_TASK_STATE,
  UPDATE_TASK,
} from './taskListActions';
import {
  REMOVE_CATEGORY,
} from '../CategoryTree/CategoryActions';

export const reducerName = `taskList`;
const initialState = {
  tasks: {},
  selected: null,
}

const removeTasks = (state, categoryId) => {
  const tasks = Object.keys(state.tasks).reduce((result, key) => {
    if (state.tasks[key].categoryId === categoryId) {
      return result;
    }
    result[key] = state.tasks[key];
    return result;
  }, {});
  const selected = state.selected !== null && tasks[state.selected] ?
    state.selected : null;
  return {
    ...state,
    tasks,
    selected
  }

}

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS_DATA:
      return { ...state, tasks: { ...state.tasks, ...action.payload } };

    case ADD_TASK:
      return { ...state, tasks: { ...state.tasks, [action.payload.id]: action.payload } };

    case UPDATE_TASK:
      return {
        ...state, tasks: {
          ...state.tasks, [action.payload.id]: {
            ...state.tasks[action.payload.id],
            ...action.payload
          }
        }
      };

    case SET_TASK_STATE:
      return {
        ...state, tasks: {
          ...state.tasks,
          [action.payload.taskId]: {
            ...state.tasks[action.payload.taskId],
            done: action.payload.state
          }
        }
      };

    case REMOVE_CATEGORY:
      return removeTasks(state, action.payload);

    default:
      return state;
  }
}