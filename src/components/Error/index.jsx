import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as actionCreators from '../../actions';
import * as actionCreators from '../../actions/pureAction';
import * as ActionTypes from '../../actions/actionTypes';

class Error extends React.Component {
  constructor(props) {
    super(props);
    const map = new Map();
    const { getItems, save, deleteItem, check } = this.props.actions;
    map.set(ActionTypes.GET_ITEMS, getItems);
    map.set(ActionTypes.SAVE, save);
    map.set(ActionTypes.CHECK, check);
    map.set(ActionTypes.DELETE, deleteItem);
    this.map = map;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (e.target.tagName === 'LI') {
      const targetAction = this.props.failedActions[e.target.value];
      this.map.get(targetAction.type)(targetAction.payload);
    }
  }
  render() {
    const failedActions = this.props.failedActions;
    const list = failedActions.map((v, index) => (
      <li value={index} >{`${v.type} fail!`}</li>
    ));
    return (
      <div onClick={this.handleClick} role="presentation">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
Error.propTypes = {
  // getItems: PropTypes.func.isRequired,
  // save: PropTypes.func.isRequired,
  // deleteItem: PropTypes.func.isRequired,
  // check: PropTypes.func.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  failedActions: PropTypes.isRequired,
};

export default connect(
  state => ({
    failedActions: state.error,
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  }),
)(Error);
