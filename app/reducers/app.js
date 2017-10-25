import { combineReducers } from 'redux';
import selectors from './selectors';
import requests from './requests';
import settings from './settings';
import * as ActionTypes from '../constants/ActionTypes';
import AppStates from '../constants/AppStates';

export default combineReducers({
  selectors,
  requests,
  appState,
  settings
});

function appState(state = 1, action) {
  switch (action.type) {
    case 1:
    case ActionTypes.GET_CLINIC_LIST_DATA:
      return AppStates.SELECT_CLINIC_PAGE;

    case ActionTypes.GET_SPECIALITY_LIST_DATA:
      return AppStates.SELECT_SPEC_PAGE;

    case ActionTypes.GET_DOCTOR_LIST_DATA:
      return AppStates.SELECT_DOCTOR_PAGE;
  }
  return state;
}