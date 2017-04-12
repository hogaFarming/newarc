/*
  配置 redux 的 store，需要传入 initialState
 */
import { createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  let store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
