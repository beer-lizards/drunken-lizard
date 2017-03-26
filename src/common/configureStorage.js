import immutableTransform from 'redux-persist-transform-immutable';

import Authorization from './authorization/authorization';
import AuthorizationState from './authorization/authorizationState';
import User from './users/user';
import UsersState from './users/usersState';

const transforms = [immutableTransform({
  records: [
    Authorization,
    AuthorizationState,
    User,
    UsersState,
  ],
})];
const whitelist = [
  'authorization',
  'session',
  'users',
];

const configureStorage = (appName, storage) => ({
  debounce: 33,
  keyPrefix: `${appName}:`,
  storage,
  transforms,
  whitelist,
});

export default configureStorage;
