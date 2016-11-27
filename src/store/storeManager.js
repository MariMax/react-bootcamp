import { combineReducers } from 'redux';
import { configureStore } from './configureStore';
import { globalStorageReducer } from './globalStorage/globalStorageReducer';
import { user } from '../reducers/user';
import { runtime } from '../reducers/runtime';
import { SAVE_GLOBAL_ITEM } from './globalStorage/actions';

const globalReducer = { name: 'globalStorage', reducer: globalStorageReducer };
const userReducer = { name: 'user', reducer: user };
const runtimeReducer = { name: 'runtime', reducer: runtime };

let store = null;

class StoreService {
    constructor(initialState, helpers) {
        this.reducers = [globalReducer, userReducer, runtimeReducer];
        const combination = this._translateToObject();
        store = configureStore(combineReducers(combination), initialState, helpers);

        this._translateToObject.bind(this);
        this._combineReducers.bind(this);
        this.addReducer.bind(this);
        this.saveGlobalItem.bind(this);
        this.subscribe.bind(this);
        this.getState.bind(this);
        this.dispatch.bind(this);
    }

    _translateToObject(){
        return this.reducers.reduce((result, i) => {
            result[i.name] = i.reducer;
            return result;
        }, {});
    }

    _combineReducers() {
        const combination = this._translateToObject();
        store.replaceReducer(combineReducers(combination));
    }

    addReducer(name, reducer) {
        this.reducers = [...this.reducers.filter(i => i.name !== name), { name, reducer }];
        this._combineReducers();
    }

    saveGlobalItem(item, identityField) {
        store.dispatch({
            type: SAVE_GLOBAL_ITEM,
            payload: { idField: identityField, item }
        })
    }

    subscribe() {
        return store.subscribe(...arguments);
    }

    getState() {
        return store.getState();
    }

    dispatch(action) {
        return store.dispatch(action);
    }
}

let storeManager = null;

export const getStoreManager = (initialState, helpers) => {
    if (storeManager) return storeManager;
    storeManager = new StoreService(initialState, helpers);
    return storeManager;
}