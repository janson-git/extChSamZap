var React = require('react');

var NavigationBar = React.createClass({
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

module.exports = NavigationBar;