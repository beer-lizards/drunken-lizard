import { Record } from 'immutable';

import * as actions from './actions';

const InitialState = Record({
  platform: '',
  host: '',
}, 'device');
const initialState = new InitialState();

export default function deviceReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state);

  switch (action.type) {

    case actions.SET_PLATFORM: {
      const { platform } = action.payload;
      return state.set('platform', platform);
    }

    default: {
      return state;
    }

  }
}
