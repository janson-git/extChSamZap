var React = require('react');

var Request = require('modules/request');

var OptionButton = require('components/OptionButton');
var OptionFollowButton = require('components/OptionFollowButton');

var PageSelectSpec = React.createClass({
  getInitialState: function() {
    return {
      error: false,
      loaded: false,
      data: []
    }
  },
  componentDidMount: function() {
    // Сделаем запрос на список доступных специальностей в поликлинике
    console.log('componentDidMount: this.props.selectedClinicId: ', this.props.selectedClinicId);
    Request.getSpecialityList(
      this.props.selectedClinicId,
      function(response) {
        if (response.status !== 200) {
          this.setState({error: true});
        } else {
          window.loadedHtml.innerHTML = response.responseText;
          var data = window.parseListDataOnPage();
          var counters = window.parsePageForTicketCounts('codespec');

          data.map(function(item, index) {
            var count = 0;
            if (counters[ item.id ] !== undefined) {
              count = counters[item.id];
            }
            data[index]['counter'] = count;
          });
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
                  <OptionFollowButton key={followId} data={item} type="spec"/>
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

module.exports = PageSelectSpec;