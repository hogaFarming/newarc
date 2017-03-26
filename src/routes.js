import React from 'react';
import {
  Route,
  IndexRoute,
  IndexRedirect
} from 'react-router';

import Login from './views/Login';
import App from './views/App';
import NoFoundPage from './views/NoFoundPage';
import EntityList from './views/EntityList';

const routes = (
  <Route path="/">
    <Route path="/login" component={Login} />
    <IndexRoute component={App}>
      <IndexRedirect to="entity-list" />
      <Route path="/entity-list" component={EntityList} />
      <Route path="*" component={NoFoundPage} />
    </IndexRoute>
  </Route>
);

export default routes;
