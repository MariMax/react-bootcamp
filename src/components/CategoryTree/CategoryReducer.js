import {
    SELECT_CATEGORY,
    UNSELECT_CATEGORY,
    SET_CATEGORIES_DATA,
    EXPAND_CATEGORY,
    COLLAPSE_CATEGORY
} from './CategoryActions';

const initialState = {
    selected: null,
    expanded: [],
    items: []
}

export const reducerName = 'categories';

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CATEGORY: 
            return {...state, selected: action.payload };

        case UNSELECT_CATEGORY:
            return {...state, selected: null };

        case SET_CATEGORIES_DATA:
            return {...initialState, items: action.payload };

        case EXPAND_CATEGORY:
            return {...state, expanded:[...state.expanded, action.payload].filter((i, index, self)=>self.indexOf(i)===index) }

        case COLLAPSE_CATEGORY:
            return {...state, expanded:[...state.expanded].filter(i=>i!==action.payload) }            

        default: return state;
    }
}