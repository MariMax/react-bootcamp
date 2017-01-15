import { SET_MODEL_STATE, SET_TASK_CATEGORY } from './taskDetailsActions';

export const reducerName = `taskDetailsReducer`;

export const taskDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL_STATE:
      return { categoryId: state.categoryId, ...action.payload }
    case SET_TASK_CATEGORY:
      return { ...state, categoryId: action.payload }
    default:
      return state;
  }
}