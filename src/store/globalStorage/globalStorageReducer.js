import {
  SAVE_GLOBAL_ITEM,
  SAVE_GLOBAL_ITEMS,
  REMOVE_GLOBAL_ITEM,
  REMOVE_GLOBAL_ITEMS
} from './actions';

export const globalStorageReducer = (state = {}, action) =>{
  switch (action.type) {
    case SAVE_GLOBAL_ITEM:
      return Object.assign({}, state, {[action.payload.item[action.payload.idField]]:action.payload.item});
    
    case SAVE_GLOBAL_ITEMS:
      return Object.assign({}, state, action.payload.items.reduce((result, item)=>{
        return Object.assign({}, result, {[item[action.payload.idField]]:item});
      },{}));
    
    case REMOVE_GLOBAL_ITEM: {
      let newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState
    }
    
    case REMOVE_GLOBAL_ITEMS:
      let newState = Object.assign({}, state);
      action.payload.forEach(i=>delete newState[i]);
      return newState;
    
    default:
      return state;
  }
}