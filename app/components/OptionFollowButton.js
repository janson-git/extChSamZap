import React from 'react';

export default class OptionFollowButton extends React.Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    let followType = undefined;
    if (e.target.attributes.length > 0 && e.target.attributes.type !== undefined) {
      followType = e.target.attributes.type.value;
    }
    this.props.onClick(e.target.value, followType);
  }

  render() {
    return (
        <button className="follow"
                value={this.props.data.id}
                onClick={this.onButtonClick}
                type={this.props.type}
        >Следить</button>
    );
  }
};
