var React = require('react');
var ReactDOM = require('react-dom');

var OptionButton = React.createClass({
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
    ee.emit('Buttons.next', {value: e.target.value});
  },
  render: function() {
    // TODO: если this.props.data.counter существует, то добавим классы: красный для 0 и зелёный для остального
    return (
      <div className="formField">
        <button value={this.props.data.id} ref={this.props.data.id}>{this.props.data.title} : {this.props.data.counter}</button>
      </div>
    );
  }
});

module.exports = OptionButton;