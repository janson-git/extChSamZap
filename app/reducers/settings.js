import * as ActionTypes from '../constants/ActionTypes';
import SettingsStorage from '../../js/modules/SettingsStorage';

const initialFollowState = {
  id: '',
  type: '',
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
  [ActionTypes.SET_FOLLOW_SETTINGS](state, action) {
    SettingsStorage.saveFollowSettings(action.data);
    return Object.assign({}, state, {
      followSettings: {id: action.id, type: action.data.type}
    });
  },
};

export default function selectors(state = initialFollowState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) {
    return state;
  }
  return reduceFn(state, action);
}
