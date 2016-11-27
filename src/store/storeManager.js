import { combineReducers } from 'redux';
import { configureStore } from './configureStore';
import { globalStorageReducer } from './globalStorage/globalStorageReducer';
import { user } from '../reducers/user';
import { runtime } from '../reducers/runtime';
import { SAVE_GLOBAL_ITEM } from './globalStorage/actions';

const globalReducer = { name: 'globalStorage', reducer: globalStorageReducer };
const userReducer = { name: 'user', reducer: user };
const runtimeReducer = { name: 'runtime', reducer: runtime };

class StoreService {
    constructor(initialState, helpers) {
        this.reducers = [globalReducer, userReducer, runtimeReducer];
        const combination = this._translateToObject();
        this.store = configureStore(combineReducers(combination), initialState, helpers)
    }

    _translateToObject(){
        return this.reducers.reduce((result, i) => {
            result[i.name] = i.reducer;
            return result;
        }, {});
    }

    _combineReducers() {
        const combination = this._translateToObject();
        this.store.replaceReducer(combineReducers(combination));
    }

    addReducer(name, reducer) {
        this.reducers = [...this.reducers.filter(i => i.name !== name), { name, reducer }];
        this._combineReducers();
    }

    saveGlobalItem(item, identityField) {
        this.store.dispatch({
            type: SAVE_GLOBAL_ITEM,
            payload: { idField: identityField, item }
        })
    }

    connect() {
        return this.store.connect(...arguments);
    }

    subscribe() {
        return this.store.subscribe(...arguments);
    }

    getState() {
        return this.store.getState();
    }

    dispatch(action) {
        this.store.dispatch(action);
    }
}

let storeManager = null;

export const getStoreManager = (initialState, helpers) => {
    if (storeManager) return storeManager;
    storeManager = new StoreService(initialState, helpers);
    return storeManager;
}