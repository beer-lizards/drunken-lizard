import bunyan from 'bunyan';

import * as actions from './actions';

const log = bunyan.createLogger({ name: 'lizard' });

const initialState = {
  authenticated: false,
  token: null,
  verifying: false,
};

export default function endpointsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SESSION_ERROR: {
      log.info('action - session - SESSION_ERROR');
      return {
        ...state,
        authenticated: false,
        verifying: false,
      };
    }
    case actions.SESSION_START: {
      log.info('action - session - SESSION_START');
      return {
        ...state,
        authenticated: false,
        verifying: true,
      };
    }
    case actions.SESSION_SUCCESS: {
      log.info('action - session - SESSION_SUCCESS');
      return {
        ...state,
        authenticated: true,
        verifying: false,
      };
    }
    default: {
      return state;
    }
  }
}
