import React from 'react';

const OptionFollowButton = React.createClass({
  onButtonClick: function(e) {
    let followType = undefined;
    if (e.target.attributes.length > 0 && e.target.attributes.type !== undefined) {
      followType = e.target.attributes.type.value;
    }
    this.props.onClick(e.target.value, followType);
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

export default OptionFollowButton;