import jwt from 'jsonwebtoken';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app/App';
import AuthPage from './auth/AuthPage';
import DashboardPage from './dashboard/DashboardPage';
import EndpointPage from './endpoint/EndpointPage';
import NotFoundPage from './notfound/NotFoundPage';

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    const token = getState().authorization.authorization.token;
    const data = jwt.decode(token.substring(7));

    const viewer = getState().users.viewer;
    if (!viewer) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={DashboardPage} onEnter={requireAuth} />
      <Route component={DashboardPage} onEnter={requireAuth} path="dashboard" />
      <Route component={EndpointPage} onEnter={requireAuth} path="endpoint" />
      <Route component={AuthPage} path="login" />
      <Route component={NotFoundPage} path="*" />
    </Route>
  );
}
