var React = require('react');
var ReactDOM = require('react-dom');

var OptionFollowButton = React.createClass({
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
    ee.emit('Buttons.follow', {value: e.target.value});
  },
  render: function() {
    return (
        <button className="follow" value={this.props.data.id} ref={this.props.data.id}>Следить</button>
    );
  }
});

module.exports = OptionFollowButton;