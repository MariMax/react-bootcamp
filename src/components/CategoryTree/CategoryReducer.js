import {
  SET_CATEGORIES_DATA,
  EXPAND_CATEGORY,
  COLLAPSE_CATEGORY,
  EDIT_CATEGORY,
  RENAME_CATEGORY,
  CANCEL_EDIT_CATEGORY,
  REMOVE_CATEGORY,
  ADD_CATEGORY
} from './CategoryActions';

const initialState = {
  expanded: [],
  items: {},
  edit: null,
}

export const reducerName = 'categories';

const setItem = (state, item) => {
 return state.items[item.id] ? {
  ...state,
   items: {
      ...state.items,
      [item.id]: item,
   },
 } : {
  ...state,
  items: {
      [item.id]: item,
      ...state.items,
    },
  };
}

const expandCategory = (state, id) => {
  return {...state, expanded: [...state.expanded, id].filter((i, index, self) => self.indexOf(i) === index) };
}

const renameCategory = (state, id, title) => {
  const item = state.items[id];
  const newItem = {...item, title: title, tmp: false };
  state = setItem(state, newItem);
  return {...state, edit: null };
};

const editCategory = (state, id) => ({...state, edit: id })

const addCategory = (state, id, category) => {
  state = setItem(state, category);
  if (id) {
    const item = state.items[id];
    const newItem = {...item, children: [category.id, ...item.children] };
    state = setItem(state, newItem);
    state = expandCategory(state, id);
    state = editCategory(state, category.id);
  }
  return state;
}

const removeCategory = (items, categoryId) => {
  items[categoryId].children.forEach(childId=>{
    removeCategory(items, childId);
  });
  items[categoryId] = null;
  return Object.keys(items).reduce((result, key)=>{
    if (items[key]){
      result[key] = items[key];
      return result;
    }
    return result;
  },{});
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES_DATA:
      return {...state, items: action.payload };

    case EXPAND_CATEGORY:
      return expandCategory(state, action.payload);

    case COLLAPSE_CATEGORY:
      return {...state, expanded: [...state.expanded].filter(i => i !== action.payload) };

    case EDIT_CATEGORY:
      return editCategory(state, action.payload);

    case RENAME_CATEGORY:
      return renameCategory(state, action.payload.id, action.payload.title);

    case CANCEL_EDIT_CATEGORY:
      return {...state, edit: null };

    case REMOVE_CATEGORY:
      return {...state, items: removeCategory({...state.items}, action.payload)};

    case ADD_CATEGORY:
      return addCategory(state, action.payload.id, action.payload.category);

    default: return state;
  }
}