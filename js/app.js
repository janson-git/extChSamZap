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
    var optionTemplate = Object.keys(clinics).map(function(key, index) {
      var item = clinics[key];
      return (
          <option value={key}>{item.title}</option>
      )
    });
    
    return (
      <select id="clinic">
        {optionTemplate}
      </select>
    )
  }
});

var PageContent = React.createClass({
  render: function() {
    return(
        <div id="content" className="content">
          <div className="form" id="form">
            <div className="formField">
              <label htmlFor="clinic" className="formLabel">Выберите поликлинику:</label>
              <ClinicSelect />
            </div>

            <div class="formField">
              <button id="selectClinic" className="buttonNext">Далее</button>
            </div>
          </div>
        </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return(
        <div>
          <Nav />
          <PageContent />
        </div>
    )
  }
});



ReactDOM.render(
    <App />,
    document.getElementById('page')
);