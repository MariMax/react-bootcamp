import {
  SET_TASKS_DATA,
  SHOW_TASKS,
} from './taskListActions';

export const reducerName = `taskList`;
const initialState = {
  tasks: {},
  shown: [],
  selected: null,

}

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS_DATA:
      return {...state, tasks: {...state.tasks, ...action.payload} }

    case SHOW_TASKS:
      return {...state, shown: Object.keys(state.tasks)
        .filter(key => state.tasks[key].categoryId === action.payload)
      }

    default:
      return state;
  }
}