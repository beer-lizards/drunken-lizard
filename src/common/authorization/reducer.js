import * as authActions from '../auth/actions';
import Authorization from './authorization';
import AuthorizationState from './authorizationState';

const initialState = new AuthorizationState();

const reducer = (
  state = initialState,
  action,
) => {
  if (!(state instanceof AuthorizationState)) {
    return initialState.merge();
  }

  switch (action.type) {
    case authActions.LOGIN_SUCCESS: {
      const { token } = action.payload;
      const authorization = new Authorization({ token });
      return state.set('authorization', authorization);
    }

    default:
      return state;

  }
};

export default reducer;
