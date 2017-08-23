import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../Todo';
// import * as actionCreators from '../../actions';
import * as actionCreators from '../../actions/pureAction';
// import { fetchItems } from '../../sagas';

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    // test: bindActionCreators({fetchItems}, dispatch),
  }),
  // {
  //   ...actionCreators,
  // },
)(App);
// es7的修饰器，据说发生在编译阶段，然而要注意导出模块的语法
// @ connect(
//   state => state,
//   dispatch => ({
//     actions: bindActionCreators(actionCreators, dispatch),
//   }),
// )
// App;
// export default App;

