import React from 'react';
import SelectClinicPageContainer from 'containers/SelectClinicPageContainer';
import {connect} from 'react-redux';
import AppStates from 'constants/AppStates';
import SelectSpecialityPageContainer from './containers/SelectSpecialityPageContainer';
import SelectDoctorPageContainer from './containers/SelectDoctorPageContainer';


class PageContent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      selectedSpecId: props.selectedSpecId
    };
  }

  render(props) {
    const pageToRender = this.props.appState;
    console.log('PageContent will render for page #' + pageToRender);

    let pageTemplate = '';
    switch (pageToRender) {
      case AppStates.SELECT_CLINIC_PAGE:
        pageTemplate = <SelectClinicPageContainer/>;
        break;

      case AppStates.SELECT_SPEC_PAGE:
        pageTemplate = <SelectSpecialityPageContainer/>;
        break;

      case AppStates.SELECT_DOCTOR_PAGE:
        pageTemplate = <SelectDoctorPageContainer/>;
        break;
    //
    //   // case 3:
    //   //   pageTemplate = <PageSelectDoctor selectedClinicId={this.state.selectedClinicId}
    //   //                                    selectedSpecId = {this.state.selectedSpecId} />;
    //   //   break;
      default:
        pageTemplate = (<b>Page num {pageToRender} template not defined</b>);
        break;
    }

    return(
      <div id="content" className="content">
        {pageTemplate}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('PageContent map: ', state);
  return {
    appState: state.appState === 1 ? AppStates.SELECT_CLINIC_PAGE : state.appState,
    selectedClinic: state.selectedClinic,
    selectedSpecialist: state.selectedSpecialist,
    selectedDoctor: state.selectedDoctor,
  };
}

export default connect(mapStateToProps)(PageContent);