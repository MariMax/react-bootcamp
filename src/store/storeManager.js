import { combineReducers } from 'redux';
import { configureStore } from './configureStore';
import { user } from '../reducers/user';
import { runtime } from '../reducers/runtime';

const userReducer = { name: 'user', reducer: user };
const runtimeReducer = { name: 'runtime', reducer: runtime };

let store = null;

class StoreService {
  constructor(initialState, helpers) {
    this.reducers = [userReducer, runtimeReducer];
    const combination = this._translateToObject();
    store = configureStore(combineReducers(combination), initialState, helpers);

    this._translateToObject.bind(this);
    this._combineReducers.bind(this);
    this.addReducer.bind(this);
    this.subscribe.bind(this);
    this.getState.bind(this);
    this.dispatch.bind(this);
  }

  _translateToObject() {
    return this.reducers.reduce((result, i) => {
      result[i.name] = i.reducer;
      return result;
    }, {});
  }

  _combineReducers() {
    const combination = this._translateToObject();
    store.replaceReducer(combineReducers(combination));
  }

  addReducer(name, reducer, action) {
    this.reducers = [...this.reducers.filter(i => i.name !== name), { name, reducer }];
    this._combineReducers();
    action && store.dispatch(action);
  }

  removeReducer(name) {
    this.reducers = [...this.reducers.filter(i => i.name !== name)];
    this._combineReducers();
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