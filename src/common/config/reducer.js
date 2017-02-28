import { Record } from 'immutable';

const InitialState = Record({
  appName: '',
}, 'config');

export default function configReducer(state = new InitialState()) {
  return state;
}
