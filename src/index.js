import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  hashHistory
} from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configureStore';
import routes from './routes';

function render() {
  let store = configureStore({
  });
  let history = syncHistoryWithStore(hashHistory, store);
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router routes={routes} history={history} />
      </Provider>
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
