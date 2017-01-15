export const SET_MODEL_STATE = `SET_MODEL_STATE`;
export const SET_TASK_CATEGORY = `SET_TASK_CATEGORY`;
export const setModelState = (model) => ({type:SET_MODEL_STATE, payload: model});
export const setTaskCategory = (categoryId) => ({type:SET_TASK_CATEGORY, payload: categoryId});