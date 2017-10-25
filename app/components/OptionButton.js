import React from 'react';

export default class OptionButton extends React.Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    this.props.onClick(e.target.value);
  }

  render() {
    // TODO: если this.props.data.counter существует, то добавим классы: красный для 0 и зелёный для остального
    const id = this.props.data.id;
    const title = this.props.data.title;
    const counter = this.props.data.counter || 0;
    return (
        <button className="option" onClick={this.onButtonClick} value={id}>{title} : {counter}</button>
    );
  }
};
