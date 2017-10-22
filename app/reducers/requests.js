import * as ActionTypes from '../constants/ActionTypes';
import ClinicList from '../constants/Clinics';

const initialState = {
  clinicList: {},
  specialityList: {},
  doctorList: {}
};

const actionsMap = {
  [ActionTypes.GET_CLINIC_LIST_DATA](state, action) {
    return Object.assign({}, state, {
      clinicList: ClinicList
    });
  },
  [ActionTypes.GET_SPECIALITY_LIST_DATA](state, action) {
    return Object.assign({}, state, {
      specialityList: action.data
    });
  },
  [ActionTypes.GET_DOCTOR_LIST_DATA](state, action) {
    return Object.assign({}, state, {
      doctorList: action.data
    });
  }
};

export default function requests(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
}
