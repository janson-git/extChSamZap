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
        pageTemplate = <b>Template page #{pageToRender}</b>;
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
      clinicId: undefined
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
                       selectedClinicId={this.state.clinicId}/>
        </div>
    )
  }
});



ReactDOM.render(
    <App />,
    document.getElementById('page')
);