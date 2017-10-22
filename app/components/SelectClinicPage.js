import React from 'react';
import ReactDOM from 'react-dom';
import SelectListItem from './SelectListItem';
import Clinics from '../constants/Clinics';

export default class SelectClinicPage extends React.Component {
  constructor(props) {
    super(props);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
  }

  render() {
    const self = this;
    return(
      <div className="form" id="form">
        <div className="formField">
          <label htmlFor="clinic" className="formLabel">Выберите поликлинику:</label>
          <select id="clinic" ref={(input) => {this.clinicId = input;}}>
            {Object.keys(Clinics).map(function (key, index) {
              let item = Clinics[key];
              item.id = key;
              item.selected = (key === self.props.selectedClinic);

              return (
                <SelectListItem key={key} data={item}/>
              )
            })}
          </select>
        </div>

        <div className="formField">
          <button id="selectClinic" className="buttonNext" onClick={this.onNextButtonClick}>Далее</button>
        </div>
      </div>
    );
  }

  onNextButtonClick(e) {
    this.props.nextButtonClick(this.clinicId.value || 0);
  }
}
