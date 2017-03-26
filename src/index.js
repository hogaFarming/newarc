import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  hashHistory
} from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';

function render() {
  ReactDOM.render(
    <AppContainer>
      <Router routes={routes} history={hashHistory} />
    </AppContainer>,
    document.getElementById('app-root')
  );
}

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render();
  });
}
