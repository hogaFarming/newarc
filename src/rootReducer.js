import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as vmReducer } from './view-models';

const rootReducer = combineReducers({
  routing: routerReducer,
  currentView: vmReducer
});

export default rootReducer;
