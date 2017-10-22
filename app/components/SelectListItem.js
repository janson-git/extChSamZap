import React from 'react';

export default class SelectListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selected = this.props.data.selected ? 'selected' : '';
    if (selected) {
      return (
        <option value={this.props.data.id} selected>{this.props.data.title}</option>
      )
    }
    return (
      <option value={this.props.data.id} >{this.props.data.title}</option>
    );
  }
}
