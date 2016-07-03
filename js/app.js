window.ee = new EventEmitter();


var Nav = React.createClass({
  render: function() {
    return(
        <div id="nav">
          <div id="back" className="hide">Назад</div>
        </div>
    )
  }
});
var ClinicSelect = React.createClass({
  render: function() {
    return (
      <option value={this.props.data.id}>{this.props.data.title}</option>
    )
  }
});

var PageContent = React.createClass({
  nextButtonClick: function(e) {
    e.preventDefault();
    ee.emit('Buttons.next');
  },
  render: function() {
    return(
        <div id="content" className="content">
          <div className="form" id="form">
            <div className="formField">
              <label htmlFor="clinic" className="formLabel">Выберите поликлинику:</label>
              <select id="clinic">
                {Object.keys(clinics).map(function(key, index) {
                  var item = clinics[key];
                  item.id = key;
                  return (
                    <ClinicSelect key={key} data={item} />
                  )
                })}
              </select>
            </div>

            <div className="formField">
              <button id="selectClinic" className="buttonNext" onClick={this.nextButtonClick}>Далее</button>
            </div>
          </div>
        </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      page: 1
    };
  },
  componentDidMount: function() {
    var self = this;
    window.ee.addListener('Buttons.next', function() {
      self.setState({page: ++self.state.page});
      console.log('event Buttons.next catched!', self.state.page);
    });
  },
  componentWillUnmount: function() {
    window.ee.removeListener('News.add');
  },
  render: function() {
    return(
        <div>
          <Nav />
          <PageContent pageNum={this.state.page}/>
        </div>
    )
  }
});



ReactDOM.render(
    <App />,
    document.getElementById('page')
);