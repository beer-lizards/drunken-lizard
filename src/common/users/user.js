import { Record } from 'immutable';

const User = Record({
  authenticated: false,
  displayName: '',
  email: '',
  userId: '',
}, 'User');

export default User;
