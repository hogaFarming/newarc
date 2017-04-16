import React from 'react';
import { connect } from 'react-redux';
import { takeEvery } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';

let allSagas = [];
let vmInitialStateRegistry = {};

registerViewModel(require('./user-list').default);

function registerViewModel(vm) {
  let { namespace, state, sagas } = vm;
  Object.keys(sagas).forEach((sagaName) => {
    let sagaFunc = sagas[sagaName];
    registerSaga(namespace, sagaName, sagaFunc);
    registerVmInitialState(namespace, state);
  });
}
function registerVmInitialState(namespace, state) {
  vmInitialStateRegistry[namespace] = state;
}
function registerSaga(namespace, sagaName, effectSaga) {
  let watchSaga = function* () {
    let actionPrefix = `__Current_View__/${namespace}`;

    let utils = {
      select,
      put,
      call,
      *putState(stateAssignment) {
        yield put({
          type: `${actionPrefix}/putState`,
          payload: stateAssignment
        });
      }
    };
    let effect = effectSaga.bind(null, utils);

    yield takeEvery(`${actionPrefix}/${sagaName}`, effect);
  };
  allSagas.push(watchSaga);
}

export function reducer(state = {}, { type, payload }) {
  let reg = /__Current_View__\/([^/]+)\/(\w+)$/;
  let match = type.match(reg);
  if (!match) return state;

  let [whole, vmNamespace, vmActionType] = match;
  switch (vmActionType) {
    case 'enterView':
      return {
        ...state,
        ...vmInitialStateRegistry[vmNamespace]
      };
    case 'leaveView':
      return omitVmInitialState(state, vmNamespace);
    case 'putState':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
function omitVmInitialState(state, vmNamespace) {
  let newState = { ...state };
  let vmInitSate = vmInitialStateRegistry[vmNamespace];
  Object.keys(vmInitSate).forEach(key => {
    delete newState[key];
  });
  return newState;
}

export const sagas = allSagas;

export function connectViewModel(vm, options) {
  let actionPrefix = `__Current_View__/${vm.namespace}`;
  return function (ViewComponent) {
    class ViewModelComponent extends React.Component {
      constructor(props) {
        super(props);
        this.effects = this.getEffects();
      }
      componentDidMount() {
        this.props.dispatch({
          type: `${actionPrefix}/enterView`
        });
        if (vm.hooks.onEnterView) {
          vm.hooks.onEnterView.bind(this.effects)();
        }
      }
      getEffects() {
        let effects = {};
        let { sagas: vmSagas } = vm;
        Object.keys(vmSagas).forEach(actionName => {
          effects[actionName] = this.vmDispatch.bind(null, actionName);
        });
        return effects;
      }
      vmDispatch = (actionType, payload) => {
        this.props.dispatch({
          type: `${actionPrefix}/${actionType}`,
          payload
        });
      }
      render() {
        return (
          this.initState ?
            <ViewComponent {...this.props} {...this.effects} /> :
            <div>{this.initState = true && 'loading view model..'}</div>
        );
      }
    }

    let wrappedComponentName = ViewComponent.displayName
      || ViewComponent.name
      || 'Component';
    ViewModelComponent.displayName = `connectVM(${wrappedComponentName})`;

    return connect(
      state => {
        return {
          ...state.currentView
        };
      }
    )(ViewModelComponent);
  };
}
