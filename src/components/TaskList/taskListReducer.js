import {
  SET_TASKS_DATA,
  ADD_TASK,
  SET_TASK_STATE,
} from './taskListActions';

export const reducerName = `taskList`;
const initialState = {
  tasks: {},
  selected: null,
}

export const taskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS_DATA:
      return {...state, tasks: {...state.tasks, ...action.payload } };

    case ADD_TASK:
      return {...state, tasks: {...state.tasks, [action.payload.id]: action.payload } };

    case SET_TASK_STATE:
      return {...state, tasks: {
        ...state.tasks,
        [action.payload.taskId]:{
          ...state.tasks[action.payload.taskId],
          done: action.payload.state
        } }};


    default:
return state;
  }
}