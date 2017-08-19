import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../Todo';
import * as actionCreators from '../../actions';

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
  }),
)(App);
