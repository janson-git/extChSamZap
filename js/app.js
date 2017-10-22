import {createStore, dispatch} from 'redux';
import appStore from '../app/reducers/app';
import {Provider} from 'react-redux';
import devToolsEnhancer from 'remote-redux-devtools';

import React from 'react';
import ReactDOM from 'react-dom';
import * as ActionTypes from '../app/constants/ActionTypes';

import App from '../app/App';

let store = createStore(appStore, devToolsEnhancer());


var EventEmitter = require('modules/EventEmitter');

window.ee = new EventEmitter();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#page')
);



store.dispatch( {type: ActionTypes.GET_CLINIC_LIST_DATA} );