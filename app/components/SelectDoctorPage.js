import React from 'react';
import OptionButton from '../components/OptionButton';
import OptionFollowButton from '../components/OptionFollowButton';

export default class SelectDoctorPage extends React.Component {
  constructor(props) {
    super(props);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.onFollowButtonClick = this.onFollowButtonClick.bind(this);
  }

  render() {
    let self = this;
    let pageTemplate;

    pageTemplate = <div className="form" id="form">
      <div className="formField">
        {this.props.doctorList.map(function (item, index) {
          var followId = 'follow_' + item.id;
          return (
            <div key={item.id} className="buttonGroup">
              <OptionButton key={item.id} data={item} onClick={self.onNextButtonClick}/>
              <OptionFollowButton key={followId} data={item} type="doctor" onClick={self.onFollowButtonClick}/>
            </div>
          )
        })}
      </div>
    </div>;

    return(
      <div>{pageTemplate}</div>
    );
  }

  onNextButtonClick(selectedDoctorId) {
    this.props.onNextButtonClick(selectedDoctorId);
  }

  onFollowButtonClick(selectedDoctorId, followType) {
    this.props.onFollowButtonClick(selectedDoctorId, followType);
  }
}
