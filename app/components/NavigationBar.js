import React from 'react';
import {connect} from 'react-redux';

class NavigationBar extends React.Component {
  render() {
    return(
      <div id="nav">
        <div id="back"
             onClick={this.props.backButtonClick}
             className={this.props.pageNum > 1 ? '' : 'hide'}>Назад</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    backButtonClick: function(e) {
      e.preventDefault();
      ee.emit('Buttons.back', {});
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);