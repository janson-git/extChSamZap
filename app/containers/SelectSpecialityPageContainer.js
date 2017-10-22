import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';
import SelectSpecialityPage from '../components/SelectSpecialityPage';


const mapStateToProps = (state) => {
  console.log('CURR STATE:', state);
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
      console.log('Spec Page Container on next button:', selectedSpecId);
      // save to store and load doctor by spec (and selected clinic id in store)
      dispatch(Actions.saveSelectedSpecialityId(selectedSpecId));
      Actions.getDoctorListBySpecialityId(dispatch, selectedClinicId, selectedSpecId);
    },
    onFollowButtonClick: (selectedSpecId, followType) => {
      // TODO: завести actions и reducers для работы со слежениями за уровнем "spec", "doctor"
      console.log('Spec Page Container on follow button ID and TYPE:', selectedSpecId, followType);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSpecialityPage);
