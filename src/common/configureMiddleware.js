import createLoggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import configureDeps from './configureDeps';

// Like redux-thunk, but with just one argument.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );

const configureMiddleware = (initialState, platformDeps, platformMiddleware, serverUrl) => {
  const deps = configureDeps(initialState, platformDeps, serverUrl);

  const middleware = [
    injectMiddleware(deps),
    ...platformMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && (
    process.env.IS_BROWSER || initialState.device.isReactNative
  );

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
    });
    middleware.push(logger);
  }

  return middleware;
};

export default configureMiddleware;
