import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
import configureStorage from './configureStorage';

export default function configureStore(options) {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options;

  const reducer = configureReducer(initialState);

  const { device: { host } } = initialState;
  // Remember to set SERVER_URL for deploy.
  const serverUrl = host || process.env.SERVER_URL ||
    // Browser is ok with relative url. Server and React Native need absolute.
    (process.env.IS_BROWSER ? '' : 'http://localhost:8000');

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
    serverUrl,
  );

  const composition = (process.env.NODE_ENV !== 'production' &&
      process.env.IS_BROWSER &&
      window.devToolsExtension) ?
      compose(
        applyMiddleware(...middleware),
        autoRehydrate({ log: true }),
        window.devToolsExtension(),
      ) : compose(
        applyMiddleware(...middleware),
        autoRehydrate({ log: true }),
      );

  const store = createStore(
    reducer,
    initialState,
    composition,
  );

  // TODO: This is temporarily in the browser/main.jsx
  if (platformDeps.storageEngine) {
    const config = configureStorage(
      'insight',
      platformDeps.storageEngine,
    );
    persistStore(store, config);
  }

  // Enable hot reload where available.
  if (module.hot) {
    const replaceReducer = configureReducer =>
      store.replaceReducer(configureReducer(initialState));

    if (initialState.device.isReactNative) {
      module.hot.accept(() => {
        replaceReducer(require('./configureReducer').default);
      });
    } else {
      module.hot.accept('./configureReducer', () => {
        replaceReducer(require('./configureReducer'));
      });
    }
  }

  return store;
}
