import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './app/reducer';
import auth from './auth/reducer';
import authorization from './authorization/reducer';
import beer from './beer/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import session from './session/reducer';
import ui from './ui/reducer';
import users from './users/reducer';
import { reduxFields } from './lib/redux-fields';

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (
  state,
  action,
) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' &&
    state.users.viewer;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    // app: state.app,
    config: initialState.config,
    // device: initialState.device,
    intl: initialState.intl,
  }, action);
};

const configureReducer = (initialState) => {
  let reducer = combineReducers({
    app,
    auth,
    authorization,
    beer,
    config,
    device,
    intl,
    reduxFields,
    routing,
    session,
    ui,
    users,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
