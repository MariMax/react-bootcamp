export const SAVE_GLOBAL_ITEM = 'SAVE_GLOBAL_ITEM';
export const REMOVE_GLOBAL_ITEM = 'REMOVE_GLOBAL_ITEM';
export const SAVE_GLOBAL_ITEMS = 'SAVE_GLOBAL_ITEMS';
export const REMOVE_GLOBAL_ITEMS = 'REMOVE_GLOBAL_ITEMS';

export const saveGlobalItem = (item, itemIdField) => ({
  type:SAVE_GLOBAL_ITEM,
  payload: {item:item, idField:itemIdField}
});

export const saveGlobalItems = (items, itemsIdField) => ({
  type:SAVE_GLOBAL_ITEMS,
  payload: {items:items, idField:itemsIdField}
});

export const removeGlobalItem = (itemId) => ({
  type:REMOVE_GLOBAL_ITEM,
  payload: itemId
});

export const removeGlobalItems = (itemIds) => ({
  type:REMOVE_GLOBAL_ITEMS,
  payload: itemIds
});
