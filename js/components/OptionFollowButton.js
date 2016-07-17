var React = require('react');

var OptionFollowButton = React.createClass({
  onButtonClick: function(e) {
    console.log(e.target);
    e.preventDefault();

    var followType = undefined;
    if (e.target.attributes.length > 0 && e.target.attributes.type !== undefined) {
      followType = e.target.attributes.type.value;
    }
    ee.emit('Buttons.follow', {value: e.target.value, type: followType});
  },
  render: function() {
    return (
        <button className="follow"
                value={this.props.data.id}
                onClick={this.onButtonClick}
                type={this.props.type}
        >Следить</button>
    );
  }
});

module.exports = OptionFollowButton;