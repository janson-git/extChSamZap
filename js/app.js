// Для разбора HTML, полученого по запросу
var view = chrome.extension.getViews()[0];
var loadedHtml = view.document.createElement('html');

function $(selector) {
  if (selector.indexOf('#') !== 0) {
    return loadedHtml.querySelectorAll(selector);
  }
  return loadedHtml.querySelector(selector);
}

/**
 * Ищет в загруженом документе тег input id="listreturn" и вытаскивает оттуда данные
 * @returns {Array}
 */
function parseListDataOnPage() {
  // варианты на выбор передаются в <input id="listreturn">
  var listStr = $('#listreturn').value;
  var list = listStr.split(';');
  var vals = []; // array of {specKey: specTitle} pairs
  for (var i in list) {
    var s = list[i].split('-');
    vals.push({id: s[0], title: s[1]});
  }
  return vals;
}

window.ee = new EventEmitter();


var Nav = React.createClass({
  backButtonClick: function(e) {
    e.preventDefault();
    ee.emit('Buttons.back', {});
  },
  render: function() {
    return(
        <div id="nav">
          <div id="back"
               onClick={this.backButtonClick}
               className={this.props.pageNum > 1 ? '' : 'hide'}>Назад</div>
        </div>
    )
  }
});



var ClinicOption = React.createClass({
  render: function() {
    var selected = this.props.data.selected ? 'selected' : '';
    if (selected) {
      return (
        <option value={this.props.data.id} selected>{this.props.data.title}</option>
      )
    }
    return (
      <option value={this.props.data.id} >{this.props.data.title}</option>
    );
  }
});

var OptionButton = React.createClass({
  componentDidMount: function() {
    var self = this;
    ReactDOM.findDOMNode(this.refs[this.props.data.id]).addEventListener('click', this.onButtonClick);
  },
  componentWillUnmount: function() {
    ReactDOM.findDOMNode(this.refs[this.props.data.id]).removeEventListener('click', this.onButtonClick);
  },
  onButtonClick: function(e) {
    console.log(e.target);
    e.preventDefault();
    ee.emit('Buttons.next', {specId: e.target.value});
  },
  render: function() {
    return (
      <div className="formField">
        <button value={this.props.data.id} ref={this.props.data.id}>{this.props.data.title}</button>
      </div>
    );
  }
});

var PageContent = React.createClass({
  onChangeSelect: function(e) {
    e.preventDefault();
    this.setState({clinicId: e.target.value});
  },
  nextButtonClick: function(e) {
    e.preventDefault();
    ee.emit('Buttons.next', {clinicId: this.state.clinicId});
  },
  getInitialState: function() {
    return {
      clinicId: Object.keys(clinics)[0]
    }
  },
  render: function() {
    var self = this;
    var pageToRender = this.props.pageNum;
    console.log('PageContent will render for page #' + pageToRender);

    var pageTemplate;
    switch (pageToRender) {
      case 1:
        pageTemplate = <div className="form" id="form">
          <div className="formField">
            <label htmlFor="clinic" className="formLabel">Выберите поликлинику:</label>
            <select id="clinic" onChange={this.onChangeSelect}>
              {Object.keys(clinics).map(function (key, index) {
                var item = clinics[key];
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
        </div>;
        break;

      case 2:
        // Сделаем запрос на список доступных специальностей в поликлинике
        var response = Request.getSpecialityList(this.props.selectedClinicId);

        if (response.status !== 200) {
          // ERROR
          pageTemplate = <p className="error">Произошла ошибка при обращении к поликлинике. Попробуйте позже.</p>;
        } else {
          loadedHtml.innerHTML = response.responseText;
          var responseData = parseListDataOnPage();

          pageTemplate = <div className="form" id="form">
            <div className="formField">
              {responseData.map(function (item, index) {
                return (
                  <OptionButton key={item.id} data={item}/>
                )
              })}
            </div>
          </div>;
        }
        break;
      case 3:
        console.log('SPEC SELECTED: ' + this.props.selectedSpecId);
        alert('SPEC SELECTED: ' + this.props.selectedSpecId);
        pageTemplate = <b>Page num {pageToRender} template not defined</b>;
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
          state.specId = data.specId;
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
          <Nav pageNum={this.state.page}/>
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