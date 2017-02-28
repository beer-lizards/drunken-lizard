import 'babel-polyfill';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import config from '../config';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import createRoutes from '../../browser/createRoutes';
import Html from './Html';
import LoadingPage from '../../browser/loading/LoadingPage';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const initialState = createInitialState();

const createRequestInitialState = (req) => {
  const host = `${req.protocol}://${req.headers.host}`;
  return {
    ...initialState,
    device: initialState.device
      .set('host', host),
  };
};

const getAppHtml = (store, renderProps, muiTheme) =>
  ReactDOMServer.renderToString(
    <MuiThemeProvider muiTheme={muiTheme}>
      <LoadingPage store={store} />
    </MuiThemeProvider>,
  );

const getScriptHtml = (state, headers, hostname, appJsFilename) =>
  // Note how app state is serialized. JSON.stringify is anti-pattern.
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  // Note how we use cdn.polyfill.io, en is default, but can be changed later.
  `
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderPage = (store, renderProps, req, muiTheme) => {
  const state = store.getState();
  const { headers, hostname } = req;
  const appHtml = getAppHtml(store, renderProps, muiTheme);
  const helmet = Helmet.rewind();
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = webpackIsomorphicTools.assets();
  const scriptHtml = getScriptHtml(state, headers, hostname, appJsFilename);
  if (!config.isProduction) {
    webpackIsomorphicTools.refresh();
  }
  const docHtml = ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={helmet}
      isProduction={config.isProduction}
    />,
  );
  return `<!DOCTYPE html>${docHtml}`;
};

export default function render(req, res, next) {
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore({
    initialState: createRequestInitialState(req),
    platformMiddleware: [routerMiddleware(memoryHistory)],
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store.getState);
  const location = req.url;

  const muiTheme = getMuiTheme({
    userAgent: req.headers['user-agent'],
  });

  match({ history, routes, location }, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }
    if (error) {
      next(error);
      return;
    }
    try {
      const html = renderPage(store, renderProps, req, muiTheme);
      // renderProps are always defined with * route.
      // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
      const status = renderProps.routes
        .some(route => route.path === '*') ? 404 : 200;
      res.status(status).send(html);
    } catch (error2) {
      next(error2);
    }
  });
}
