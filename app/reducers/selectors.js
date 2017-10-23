import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  selectedClinic: 0,
  selectedSpeciality: 0,
  selectedDoctor: 0
};

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
