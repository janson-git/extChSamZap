var React = require('react');

var Request = require('modules/request');

var OptionButton = require('components/OptionButton');

var SelectDoctorPage = React.createClass({
  getInitialState: function() {
    return {
      error: false,
      loaded: false,
      data: []
    }
  },
  componentDidMount: function() {
    // Сделаем запрос на список докторов по специальности в поликлинике
    Request.getDoctorListBySpeciality(
      this.props.selectedClinicId,
      this.props.selectedSpecId,
      function(response) {
        if (response.status !== 200) {
          this.setState({error: true});
        } else {
          window.loadedHtml.innerHTML = response.responseText;
          this.setState({error: false, loaded: true, data: window.parseListDataOnPage()});
        }
      }.bind(this)
    );
  },
  render: function() {
    var pageTemplate;

    if (this.state.error) {
      pageTemplate = <p className="error">Произошла ошибка при обращении к поликлинике. Попробуйте позже.</p>;
    } else {
      if (this.state.loaded) {
        pageTemplate = <div className="form" id="form">
          <div className="formField">
            {this.state.data.map(function (item, index) {
              return (
                <OptionButton key={item.id} data={item}/>
              )
            })}
          </div>
        </div>;
      } else {
        pageTemplate = <div className="preloader"></div>;
      }
    }

    return(
      <div id="content" className="content">
        {pageTemplate}
      </div>
    );
  }
});

module.exports = SelectDoctorPage;