import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import SelectDoctorPage from '../components/SelectDoctorPage';


const mapStateToProps = (state) => {
  return {
    selectedClinic: state.selectors.selectedClinic,
    selectedSpeciality: state.selectors.selectedSpeciality,
    selectedDoctor: state.selectors.selectedDoctor,
    doctorList: state.requests.doctorList,
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    onNextButtonClick: (selectedDoctorId) => {
      console.log('Doctor Page Container on next button:', selectedDoctorId);
      // save to store and load ??
      dispatch(Actions.saveSelectedDoctorId(selectedDoctorId));
      // Actions.getDoctorListBySpecialityId(dispatch, selectedClinicId, selectedDoctorId);
    },
    onFollowButtonClick: (selectedDoctorId, followType) => {
      // TODO: завести actions и reducers для работы со слежениями за уровнем "spec", "doctor"
      console.log('Doctor Page Container on follow button ID and TYPE:', selectedDoctorId, followType);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectDoctorPage);
