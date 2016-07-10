var EventEmitter = require('modules/EventEmitter');

window.ee = new EventEmitter();

// Для разбора HTML, полученого по запросу
window.view = chrome.extension.getViews()[0];
window.loadedHtml = view.document.createElement('html');

window.$ = function(selector) {
  if (selector.indexOf('#') !== 0) {
    return window.loadedHtml.querySelectorAll(selector);
  }
  return window.loadedHtml.querySelector(selector);
};

/**
 * Ищет в загруженом документе тег input id="listreturn" и вытаскивает оттуда данные
 * @returns {Array}
 */
window.parseListDataOnPage = function() {
  // варианты на выбор передаются в <input id="listreturn">
  var listStr = $('#listreturn').value;
  var list = listStr.split(';');
  var vals = []; // array of {specKey: specTitle} pairs
  for (var i in list) {
    var s = list[i].split('-');
    vals.push({id: s[0], title: s[1]});
  }
  return vals;
};

/**
 * Ищет в загруженом документе активные (зелёные) кнопки с номерками докторов
 * @param type string Возможные значения 'codemed' (кнопки докторов), 'codespec' (кнопки специальностей)
 * @return {Object}
 */
window.parsePageForTicketCounts = function(type) {
  var onclickValue = type || 'codemed';
  var counters = {};

  var enabledDoctors = $('button.SM_ACTIV[onClick*=' + onclickValue + ']');
  var i;
  for (i in enabledDoctors) {
    var item = enabledDoctors[i];
    if (typeof item === 'object' && item.hasAttribute('onclick')) {
      var reg = new RegExp(".*" + onclickValue + "\.value='([^']*)'", 'i');
      // var reg = /.*codemed\.value='([^']*)'/i;
      var itemId = reg.exec(item.getAttribute('onclick'))[1];

      // распарсим количество номерков с кнопки
      var buttonText = item.querySelector('span').innerText;
      var ticketsNum = /.*НОМЕРКОВ:\s?([\d]*).*/i.exec(buttonText)[1];

      counters[itemId + ''] = parseInt(ticketsNum);
    }
  }
  return counters;
};




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
      specId: undefined
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