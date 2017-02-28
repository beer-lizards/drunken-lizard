import { Record } from 'immutable';

import * as actions from './actions';

const InitialState = Record({
  isSideMenuOpen: false,
});
const initialState = new InitialState();

export default function uiReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState;

  switch (action.type) {

    case actions.ON_SIDE_MENU_CHANGE: {
      const { isOpen } = action.payload;
      return state.set('isSideMenuOpen', isOpen);
    }

    case actions.TOGGLE_SIDE_MENU: {
      return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen);
    }

    default: {
      return state;
    }

  }
}
