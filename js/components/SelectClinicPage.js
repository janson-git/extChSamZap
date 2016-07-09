var React = require('react');
var ReactDOM = require('react-dom');

var Clinics = require('modules/Clinics');
var ClinicOption = require('components/ClinicOption');


var SelectClinicPage = React.createClass({
  nextButtonClick: function(e) {
    e.preventDefault();
    ee.emit('Buttons.next', {clinicId: ReactDOM.findDOMNode(this.refs.clinicId).value});
  },
  render: function() {
    var self = this;
    return(
      <div className="form" id="form">
        <div className="formField">
          <label htmlFor="clinic" className="formLabel">Выберите поликлинику:</label>
          <select id="clinic" ref="clinicId">
            {Object.keys(Clinics).map(function (key, index) {
              var item = Clinics[key];
              item.id = key;
              item.selected = (key === self.props.selectedClinicId);

              return (
                <ClinicOption key={key} data={item}/>
              )
            })}
          </select>
        </div>

        <div className="formField">
          <button id="selectClinic" className="buttonNext" onClick={this.nextButtonClick}>Далее</button>
        </div>
      </div>
    );
  }
});

module.exports = SelectClinicPage;