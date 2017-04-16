/*
  配置 redux 的 store，需要传入 initialState
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { sagas as vmSagas } from './view-models';

let sagaMiddleware = createSagaMiddleware();
let composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

let enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

export default function configureStore(initialState) {
  let store = createStore(
    rootReducer,
    initialState,
    enhancer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  sagaMiddleware.run(...vmSagas);
  return store;
}
