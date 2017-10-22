import React from 'react';

const OptionButton = React.createClass({
  onButtonClick: function(e) {
    this.props.onClick(e.target.value);
  },
  render: function() {
    // TODO: если this.props.data.counter существует, то добавим классы: красный для 0 и зелёный для остального
    const id = this.props.data.id;
    const title = this.props.data.title;
    const counter = this.props.data.counter || 0;
    return (
        <button className="option" onClick={this.onButtonClick} value={id}>{title} : {counter}</button>
    );
  }
});

export default OptionButton;