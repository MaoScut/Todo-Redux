import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item, hideDone, editHandle, checkHandle }) {
  const { id, content, checked } = item;
  const className = checked && hideDone ? 'hidden' : '';
  // let checkbox = null;
  function onEditClick(e) {
    e.stopPropagation();
    editHandle({
      id,
      content,
      checked,
    });
  }
  function checkboxClick() {
    // checkbox.checked = !checkbox.checked;
    checkHandle(id);
  }
  return (
    <li className={className}>
      <input
        type="checkbox"
        className="checkbox"
        value={id}
        checked={checked}
        readOnly
      />
      {content}
      <button className="edit" onClick={onEditClick}>编辑</button>
      <button className="delete-btn" value={id}>删除</button>
    </li>
  );
}
// 有自己的state的TodoItem；
// class TodoItem extends React.Component {
//   constructor(props) {
//     super(props);
//     const { id, content, checked, hideDone } = props;
//     this.state = {
//       content,
//       id,
//       checked,
//       hideDone,
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
//   // componentDidUpdate() {
//   //   // this.props.checkHandle(this.props.id); dangerous!
//   // }
//   onEditClick(e) {
//     e.stopPropagation();
//     this.props.editHandle({
//       id: this.props.id,
//       content: this.props.content,
//       checked: this.props.checked,
//     });
//   }
//   handleClick() {
//     this.setState(preState => ({
//       checked: !preState.checked,
//     }), () => {
//       this.props.checkHandle(this.props.id);
//     });
//   }
//   render() {
//     const { hideDone, content, id } = this.props;
//     const className = hideDone ? 'hidden' : '';
//     return (
//       <li className={className}>
//         <input
//           type="checkbox"
//           className="checkbox"
//           value={id}
//           checked={this.state.checked}
//           onChange={this.handleClick}
//         />
//         {content}
//         <button className="edit" onClick={this.onEditClick}>编辑</button>
//         <button className="delete-btn" value={id}>删除</button>
//       </li>
//     );
//   }
// }
TodoItem.propTypes = {
  // content: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  // checked: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  hideDone: PropTypes.bool.isRequired,
  editHandle: PropTypes.func.isRequired,
  checkHandle: PropTypes.func.isRequired,
};