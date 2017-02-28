import { Record } from 'immutable';
import Authorization from './authorization';

const AuthorizationState = Record({
  authorization: new Authorization(),
}, 'AuthorizationState');

export default AuthorizationState;
