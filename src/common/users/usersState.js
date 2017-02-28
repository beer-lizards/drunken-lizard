import { Record } from 'immutable';

const UsersState = Record({
  list: null,
  viewer: null,
}, 'UsersState');

export default UsersState;
