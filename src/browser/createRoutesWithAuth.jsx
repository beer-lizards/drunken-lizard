import jwt from 'jsonwebtoken';
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app/App';
import AuthPage from './auth/AuthPage';
import BeerPage from './beer/BeerPage';
import NotFoundPage from './notfound/NotFoundPage';
import SignUpPage from './signup/SignUpPage';

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
      <IndexRoute component={BeerPage} onEnter={requireAuth} />
      <Route component={NotFoundPage} onEnter={requireAuth} path="dashboard" />
      <Route component={AuthPage} path="login" />
      <Route component={BeerPage} path="beer" />
      <Route component={SignUpPage} path="signup" />
      <Route component={NotFoundPage} path="*" />
    </Route>
  );
}
