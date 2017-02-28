import { Record } from 'immutable';

const AuthState = Record({
  formDisabled: false,
  formError: null,
});

export default AuthState;
