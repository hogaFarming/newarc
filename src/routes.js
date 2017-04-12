import React from 'react';
import {
  Route,
  IndexRedirect
} from 'react-router';

import App from './views/App';
import UserList from './views/UserList';

const routes = (
  <Route>
    <Route path="/" component={App}>
      <IndexRedirect to="/user-list" />
      <Route path="/user-list" component={UserList} />
    </Route>
  </Route>
);

export default routes;
