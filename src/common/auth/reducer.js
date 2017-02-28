import bunyan from 'bunyan';
import * as actions from './actions';
import AuthState from './authState';

const log = bunyan.createLogger({ name: 'lizard' });

const initialState = new AuthState();

const reducer = (
  state = initialState,
  action,
) => {
  if (!(state instanceof AuthState)) {
    log.info(`Current state ${initialState}`);
    return initialState.mergeDeep(state);
  }

  log.info(`auth action - ${action.type}`);
  switch (action.type) {

    // Note how one reducer can handle several actions.
    case actions.LOGIN_START:
      return state.set('formDisabled', true);

    case actions.LOGIN_ERROR:
      return state.merge({ formDisabled: false, formError: action.payload });

    case actions.LOGIN_SUCCESS:
      return state.merge({ formDisabled: false, formError: null });

    default:
      return state;

  }
};

export default reducer;
