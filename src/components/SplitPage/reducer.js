export const SET_SPLIT_ACTIVE_SIDE = 'SET_SPLIT_ACTIVE_SIDE';
export const INIT_SPLIT_STORE = 'INIT_SPLIT_STORE';
export const LEFT_ACTIVE = 'left';
export const RIGHT_ACTIVE = 'right';

export const initSplitStore = (id, activeSide) => ({
  type: INIT_SPLIT_STORE,
  payload: { id, activeSide },
});

export const setActiveSide = (id, activeSide) => ({
  type: SET_SPLIT_ACTIVE_SIDE,
  payload: { id, activeSide },
});

const setNewActiveSide = (state, action) => {
  if (state.id === action.payload.id) {
    return {...state, activeSide: action.payload.activeSide };
  }
  return state;
}

const initStore = (state, action) => {
  if (!state.id) {
    return {...state, id: action.payload.id, activeSide: action.payload.activeSide };
  }
  // return setNewActiveSide(state, action);
  return state;
}

export const splitPageReducer = (state = { activeSide: LEFT_ACTIVE }, action) => {
  switch (action.type) {
    case INIT_SPLIT_STORE:
      return initStore(state, action);

    case SET_SPLIT_ACTIVE_SIDE:
      return setNewActiveSide(state, action);

    default: return state;
  }
}