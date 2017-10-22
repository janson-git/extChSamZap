import React from 'react';
import {connect} from 'react-redux';
import SelectClinicPage from '../components/SelectClinicPage';
import * as Actions from '../actions/actions.js';


const mapStateToProps = (state) => {
  return {
    selectedClinic: state.selectedClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onClick для кнопки выбора поликлиники
    nextButtonClick: (selectedClinicId) => {
      // save to store and load specs by clinic
      dispatch(Actions.saveSelectedClinicId(selectedClinicId));
      Actions.getSpecListByClinicId(dispatch, selectedClinicId);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectClinicPage);
