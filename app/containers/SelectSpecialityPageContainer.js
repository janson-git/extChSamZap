import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import SelectSpecialityPage from '../components/SelectSpecialityPage';


const mapStateToProps = (state) => {
  return {
    selectedClinic: state.selectors.selectedClinic,
    specialityList: state.requests.specialityList,
    selectedSpeciality: state.selectors.selectedSpeciality,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClick для кнопки выбора поликлиники
    onNextButtonClick: (selectedClinicId, selectedSpecId) => {
      // save to store and load doctor by spec (and selected clinic id in store)
      dispatch(Actions.saveSelectedSpecialityId(selectedSpecId));
      Actions.getDoctorListBySpecialityId(dispatch, selectedClinicId, selectedSpecId);
    },
    onFollowButtonClick: (selectedSpecId, followType) => {
      // save follow settings to local storage: it will be accessible for bg scripts
      dispatch(Actions.saveFollowSettings(selectedSpecId, followType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSpecialityPage);
