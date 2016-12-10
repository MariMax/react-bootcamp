import { v4 } from 'uuid';

export const EXPAND_CATEGORY = 'EXPAND_CATEGORY';
export const COLLAPSE_CATEGORY = 'COLLAPSE_CATEGORY';
export const RENAME_CATEGORY = 'RENAME_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const CANCEL_EDIT_CATEGORY = 'CANCEL_EDIT_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';

export const addCategory = (id, title) => {
  const newId = v4();
  const category = {
    id: newId,
    title: title || 'new category',
    children: [],
    parent: id,
    tmp: true,
  };

  return {
    type: ADD_CATEGORY,
    payload: { id, category },
  };
};

export const removeCategory = id => ({
  type: REMOVE_CATEGORY,
  payload: id,
});

export const editCategory = id => ({
  type: EDIT_CATEGORY,
  payload: id,
})

export const cancelEditCategory = _ => ({
  type: CANCEL_EDIT_CATEGORY,
})

export const renameCategory = (id, title) => ({
  type: RENAME_CATEGORY,
  payload: { id, title },
});

export const collapseCategory = id => ({
  type: COLLAPSE_CATEGORY,
  payload: id,
})

export const expandCategory = id => ({
  type: EXPAND_CATEGORY,
  payload: id,
})

export const setData = dataArray => ({
  type: SET_CATEGORIES_DATA,
  payload: dataArray.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {}),
})