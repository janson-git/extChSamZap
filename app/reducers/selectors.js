import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  selectedClinic: 0,
  selectedSpeciality: 0,
  selectedDoctor: 0
};

const actionsMap = {
  [ActionTypes.SELECTED_CLINIC](state, action) {
    return [{
      selectedClinic: action.id
    }, ...state];
  },
  [ActionTypes.SELECTED_SPECIALITY](state, action) {
    return [{
      selectedSpeciality: action.id
    }, ...state];
  }
};

export default function selectors(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
}
