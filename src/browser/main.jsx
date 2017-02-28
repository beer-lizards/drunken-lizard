import 'babel-polyfill';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import localforage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import AppProvider from './app/Root';
import configureStore from '../common/configureStore';

window.Promise = require('../common/configureBluebird');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const initialState = window.__INITIAL_STATE__;

const store = configureStore({
  initialState,
  platformDeps: { uuid, storageEngine: localforage },
  platformMiddleware: [routerMiddleware(browserHistory)],
});

const appElement = document.getElementById('app');

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <AppProvider store={store} history={history} />,
  appElement,
);
