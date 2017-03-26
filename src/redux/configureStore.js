/*
  配置 redux 的 store，需要传入 initialState
 */
import { createStore } from 'redux';
import rootReducer from './reducersTable';

export default function configureStore(initialState) {
  let store = createStore(rootReducer, initialState);
  return store;
}
