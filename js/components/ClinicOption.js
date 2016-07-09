var React = require('react');

var ClinicOption = React.createClass({
  render: function() {
    var selected = this.props.data.selected ? 'selected' : '';
    if (selected) {
      return (
        <option value={this.props.data.id} selected>{this.props.data.title}</option>
      )
    }
    return (
      <option value={this.props.data.id} >{this.props.data.title}</option>
    );
  }
});

module.exports = ClinicOption;