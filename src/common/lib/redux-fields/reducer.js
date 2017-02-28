import { Map } from 'immutable';

import * as actions from './actions';

const initialState = Map();

export default function reducer(state = initialState, action) {
  if (!(state instanceof Map)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.RESET_FIELDS: {
      const { path } = action.payload;
      return state.deleteIn(path);
    }

    case actions.SET_FIELD: {
      const { path, value } = action.payload;
      return state.setIn(path, value);
    }

    default: {
      return state;
    }

  }
}
