import {
    SELECT_CATEGORY,
    UNSELECT_CATEGORY,
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
    selected: null,
    expanded: [],
    items: [],
    edit:null,
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

        case EDIT_CATEGORY:
            return {...state, edit:action.payload};

        case RENAME_CATEGORY: case CANCEL_EDIT_CATEGORY:
            return {...state, edit: null}
            
        case REMOVE_CATEGORY:
            return {...state, items: state.items.filter(i=>i !== action.payload)}

        case ADD_CATEGORY:
            return {...state, items: [action.payload, ...state.items]}

        default: return state;
    }
}