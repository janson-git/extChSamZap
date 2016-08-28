var EventEmitter = require('modules/EventEmitter');
var getParser = require('modules/parser');

window.ee = new EventEmitter();
window.parser = getParser();


var React = require('react');
var ReactDOM = require('react-dom');

var Clinics = require('modules/Clinics');

var NavigationBar = require('components/NavigationBar');
var PageSelectClinic = require('components/SelectClinicPage');
var PageSelectSpec = require('components/SelectSpecializationPage');
var PageSelectDoctor = require('components/SelectDoctorPage');



var PageContent = React.createClass({
  render: function() {
    var self = this;
    var pageToRender = this.props.pageNum;
    console.log('PageContent will render for page #' + pageToRender);

    var pageTemplate;
    switch (pageToRender) {
      case 1:
        pageTemplate = <PageSelectClinic selectedClinicId={this.props.selectedClinicId} />;
        break;

      case 2:
        pageTemplate = <PageSelectSpec selectedClinicId={this.props.selectedClinicId} />;
        break;
      case 3:
        pageTemplate = <PageSelectDoctor selectedClinicId={this.props.selectedClinicId}
                                         selectedSpecId = {this.props.selectedSpecId} />;
        break;
      default:
        pageTemplate = <b>Page num {pageToRender} template not defined</b>;
        break;
    }

    return(
        <div id="content" className="content">
          {pageTemplate}
        </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      page: 1,
      clinicId: undefined,
      specId: undefined,
      doctorId: undefined
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener('Buttons.next', function(data) {
      console.log('data: ', data);

      var pageNum = self.state.page + 1;
      var state = {page: pageNum};

      switch (self.state.page) {
        case 1:
          state.clinicId = data.clinicId;
          break;
        case 2:
          state.specId = data.value;
          break;
        case 3:
          // кликнули на доктора
          state.doctorId = data.value;
          console.log('DOCTOR SELECT!', data);
          // TODO: сохраним всё в хранилище и выбросим событие, что надо отслеживать доктора
          break;
        default:
          break;
      }
      self.setState(state);
      console.log('event Buttons.next catched!', self.state.page);
    });

    window.ee.addListener('Buttons.back', function(data) {
      console.log('data: ', data);
      self.setState({page: self.state.page - 1});
      console.log('event Buttons.back catched!', self.state.page);
    });

    window.ee.addListener('Buttons.follow', function(data) {
      console.log('data of follow: ', data);
      console.log('app state: ', self.state);

      // при нажатии на кнопку "Следить" надо сохранять в Local Storage
      // и уведомлять фоновый процесс об изменениях.
      if (data.type === 'doctor') {
        self.setState({doctorId: data.value});
        chrome.storage.local.set({
          clinicId: self.state.clinicId,
          specId: self.state.specId,
          doctorId: data.value
        });

        chrome.runtime.sendMessage({
          "name": "Follow.Doctor",
          "clinicId": self.state.clinicId,
          "specId": self.state.specId,
          "doctorId": data.value
        });

      } else if (data.type === 'spec') {
        self.setState({specId: data.value});
        chrome.storage.local.set({
          clinicId: self.state.clinicId,
          specId: data.value
        });
        chrome.storage.local.remove('doctorId');

        chrome.runtime.sendMessage({
          "name": "Follow.Spec",
          "clinicId": self.state.clinicId,
          "specId": data.value
        });
      }

    });
  },
  componentWillUnmount: function() {
    window.ee.removeListener('Buttons.next');
    window.ee.removeListener('Buttons.back');
  },
  render: function() {
    return(
        <div>
          <NavigationBar pageNum={this.state.page}/>
          <PageContent pageNum={this.state.page}
                       selectedClinicId={this.state.clinicId}
                       selectedSpecId={this.state.specId}/>
        </div>
    )
  }
});



ReactDOM.render(
    <App />,
    document.getElementById('page')
);