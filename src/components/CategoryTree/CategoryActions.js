import { saveGlobalItems, saveGlobalItem, removeGlobalItem } from '../../store/globalStorage/actions';
import { v4 } from 'uuid';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY';
export const EXPAND_CATEGORY = 'EXPAND_CATEGORY';
export const COLLAPSE_CATEGORY = 'COLLAPSE_CATEGORY';
export const RENAME_CATEGORY = 'RENAME_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const CANCEL_EDIT_CATEGORY = 'CANCEL_EDIT_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ATTACH_TASK = 'ATTACH_TASK';
export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';

export const addCategory = (id,title) => (dispatch, getState) => {
    const newId = v4(); 
    dispatch(saveGlobalItem({
        id:newId,
        title: title||'new category',
        tasks:[],
        children:[],
        parent:id
    }, 'id'));

    if (id){
        const state = getState();
        const item = state.globalStorage[id];
        const newItem = {...item, children:[...item.children, newId]};
        dispatch(saveGlobalItem(newItem, 'id'));
        dispatch(expandCategory(id));
        dispatch(editCategory(newId));
    }

    dispatch({
        type: ADD_CATEGORY,
        payload: newId
    });
};

export const removeCategory = id => (dispatch, getState) => {
    // const state = getState();
    // let item = state.globalStorage[id];
    //todo need to remove all children and tasks
    dispatch(removeGlobalItem(id));

    dispatch({
        type: REMOVE_CATEGORY,
    });
};

export const editCategory = id => ({
    type: EDIT_CATEGORY,
    payload: id,
})

export const cancelEditCategory = _ => ({
    type: CANCEL_EDIT_CATEGORY,
})

export const renameCategory = (id, title) => (dispatch, getState) => {
    const state = getState();
    let item = state.globalStorage[id];
    const newItem = {...item, title: title };

    dispatch(saveGlobalItem(newItem, 'id'));

    dispatch({
        type: RENAME_CATEGORY,
    });
};

export const collapseCategory = id => ({
    type: COLLAPSE_CATEGORY,
    payload: id,
})

export const expandCategory = id => ({
    type: EXPAND_CATEGORY,
    payload: id,
})

export const selectCategory = id => (dispatch, getState) => {
    const state = getState();
    let item = state.globalStorage[id];
    while (item.parent) {
        dispatch(expandCategory(item.parent));
        item = state.globalStorage[item.parent];
    }
    dispatch({
        type: SELECT_CATEGORY,
        payload: id,
    });
};

export const unselectCategory = () => {
    return {
        type: UNSELECT_CATEGORY,
    }
};

export const setData = data => dispatch => {
    dispatch(saveGlobalItems(data, 'id'));

    dispatch({
        type: SET_CATEGORIES_DATA,
        payload: data.map(i => i.id),
    })
}