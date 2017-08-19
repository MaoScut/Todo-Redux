import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import * as storage from '../stores/storage';
// [{
//   passed: false,
//   expected: 'xxx',
//   inFact: 'yyy',
// }]
// window.storage = storage;
// // addItem是异步的
// storage.addItem({
//   id: '1234',
//   content: '1234234',
//   checked: false,
// }).then(result => console.log(result));
// console.log('hhhhhhhhhhhh');
function ShowTestResult({ results }) {
  const list = results.map((v) => {
    const className = v.passed ? 'passed' : 'error';
    const message = v.passed.concat('! ', 'expected:', v.expected, '; ', 'in fact: ', v.inFact);
    return <p className={className}>{message}</p>;
  });
  return (
    <div>
      {list}
    </div>
  );
}
ShowTestResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    passed: PropTypes.bool,
    expected: PropTypes.string,
    inFact: PropTypes.string,
  })).isRequired,
};

ReactDom.render(<ShowTestResult results={[]} />, document.getElementById('root'));
