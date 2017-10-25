import * as ActionTypes from '../constants/ActionTypes';

const settings = function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_FOLLOW_SETTINGS:
      chrome.storage.local.set(
        {followSettings: action.data},
        () => {
          console.log('SETTINGS SAVED!');
          chrome.storage.local.get(['followSettings'], (items) => console.log(items));
        }
      );
      break;
    case ActionTypes.SELECTED_CLINIC:
      chrome.storage.local.set(
        {clinicId: action.data.clinicId},
        () => {
          console.log('SETTINGS SAVED!');
          chrome.storage.local.get(['followSettings'], (items) => console.log(items));
        }
      );
      break;
  }
  return state;
};

export default settings;

const actionsMap = {
  [ActionTypes.SELECTED_CLINIC](state, action) {
    return Object.assign({}, state, {
      selectedClinic: action.id
    });
  },
  [ActionTypes.SELECTED_SPECIALITY](state, action) {
    return Object.assign({}, state, {
      selectedSpeciality: action.id
    });
  },
  [ActionTypes.SELECTED_DOCTOR](state, action) {
    return Object.assign({}, state, {
      selectedDoctor: action.id
    });
  },
};

export default function selectors(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
}
