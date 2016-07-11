var React = require('react');

var OptionFollowButton = React.createClass({
  onButtonClick: function(e) {
    console.log(e.target);
    e.preventDefault();
    ee.emit('Buttons.follow', {value: e.target.value});
  },
  render: function() {
    return (
        <button className="follow" value={this.props.data.id} onClick={this.onButtonClick}>Следить</button>
    );
  }
});

module.exports = OptionFollowButton;