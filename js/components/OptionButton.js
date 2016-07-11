var React = require('react');

var OptionButton = React.createClass({
  onButtonClick: function(e) {
    console.log(e.target);
    e.preventDefault();
    ee.emit('Buttons.next', {value: e.target.value});
  },
  render: function() {
    // TODO: если this.props.data.counter существует, то добавим классы: красный для 0 и зелёный для остального
    var id = this.props.data.id;
    var title = this.props.data.title;
    var counter = this.props.data.counter || 0;
    return (
        <button className="option" onClick={this.onButtonClick} value={id}>{title} : {counter}</button>
    );
  }
});

module.exports = OptionButton;