import React from 'react';
import OptionButton from '../components/OptionButton';
import OptionFollowButton from '../components/OptionFollowButton';

export default class SelectSpecialityPage extends React.Component {
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
        {this.props.specialityList.map(function (item, index) {
          var followId = 'follow_' + item.id;
          return (
            <div key={item.id} className="buttonGroup">
              <OptionButton key={item.id} data={item} onClick={self.onNextButtonClick}/>
              <OptionFollowButton key={followId} data={item} type="spec" onClick={self.onFollowButtonClick}/>
            </div>
          )
        })}
      </div>
    </div>;

    return(
      <div>{pageTemplate}</div>
    );
  }

  onNextButtonClick(selectedSpecId) {
    console.log('PROPS:', this.props);
    this.props.onNextButtonClick(this.props.selectedClinic, selectedSpecId);
  }

  onFollowButtonClick(selectedSpecId, followType) {
    this.props.onFollowButtonClick(selectedSpecId, followType);
  }
}