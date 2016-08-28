var React = require('react');

var Request = require('modules/request');

var OptionButton = require('components/OptionButton');
var OptionFollowButton = require('components/OptionFollowButton');

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
          window.parser.loadedHtml.innerHTML = response.responseText;
          var data = window.parser.parseListDataOnPage();
          var counters = window.parser.parsePageForTicketCounts('codemed');

          data.map(function(item, index) {
            var count = 0;
            if (counters[ item.id ] !== undefined) {
              count = counters[item.id];
            }
            data[index]['counter'] = count;
          });
          console.log('DATA: ', data);
          this.setState({error: false, loaded: true, data: data});
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
              var followId = 'follow_' + item.id;
              return (
                <div className="buttonGroup">
                  <OptionButton key={item.id} data={item}/>
                  <OptionFollowButton key={followId} data={item} type="doctor"/>
                </div>
              )
            })}
          </div>
        </div>;
      } else {
        pageTemplate = <div className="preloader"></div>;
      }
    }

    return(
      <div>
        {pageTemplate}
      </div>
    );
  }
});

module.exports = SelectDoctorPage;