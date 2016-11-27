import { saveGlobalItems } from '../../store/globalStorage/actions';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY';
export const EXPAND_CATEGORY = 'EXPAND_CATEGORY';
export const COLLAPSE_CATEGORY = 'COLLAPSE_CATEGORY';
export const RENAME_CATEGORY = 'RENAME_CATEGORY';
export const ATTACH_TASK = 'ATTACH_TASK';
export const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA';

export const collapseCategory = id => ({
    type: COLLAPSE_CATEGORY,
    payload: id
})

export const expandCategory = id => ({
    type: EXPAND_CATEGORY,
    payload: id
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
        payload: id
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
        payload: data.map(i => i.id)
    })
}