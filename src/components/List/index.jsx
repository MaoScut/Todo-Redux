import React from 'react';
import PropTypes from 'prop-types';
import Statics from '../Statics';

function List({ items, hideHandle, hideDone, editHandle, checkHandle }) {
  let doneNum = 0;
  const list = items.map((item) => {
    const { id, content, checked } = item;
    if (checked) doneNum += 1;
    return (
      <TodoItem
        key={id}
        id={id}
        content={content}
        checked={checked}
        hideDone={hideDone}
        editHandle={editHandle}
        checkHandle={checkHandle}
      />
    );
  });
  const buttonText = hideDone ? '显示已完成事项' : '隐藏已完成事项';
  const donePercent = String(doneNum).concat('/', items.length);
  return (
    <div>
      <ul>
        {list}
      </ul>
      <Statics donePercent={donePercent} />
      <button onClick={() => hideHandle()}>{buttonText}</button>
    </div>
  );
}
List.propTypes = {
  // items: PropTypes.shape({
  //   id: PropTypes.string,
  //   content: PropTypes.string,
  // }),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
  })).isRequired,
  hideDone: PropTypes.bool.isRequired,
  hideHandle: PropTypes.func.isRequired,
  editHandle: PropTypes.func.isRequired,
  checkHandle: PropTypes.func.isRequired,
};

// function TodoItem({ content, id, checked, hideDone, editHandle, checkHandle }) {
//   const className = checked && hideDone ? 'hidden' : '';
//   let checkbox = null;
//   function onEditClick(e) {
//     e.stopPropagation();
//     editHandle({
//       id,
//       content,
//       checked,
//     });
//   }
//   function checkboxClick() {
//     // checkbox.checked = !checkbox.checked;
//     checkHandle(id);
//   }
//   return (
//     <li className={className}>
//       <input
//         type="checkbox"
//         className="checkbox"
//         value={id}
//         checked={checked}
//         onClick={checkboxClick}
//         ref={(input) => { checkbox = input; }}
//       />
//       {content}
//       <button className="edit" onClick={onEditClick}>编辑</button>
//       <button className="delete-btn" value={id}>删除</button>
//     </li>
//   );
// }
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    const { id, content, checked, hideDone } = props;
    this.state = {
      content,
      id,
      checked,
      hideDone,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  // componentDidUpdate() {
  //   // this.props.checkHandle(this.props.id); dangerous!
  // }
  onEditClick(e) {
    e.stopPropagation();
    this.props.editHandle({
      id: this.props.id,
      content: this.props.content,
      checked: this.props.checked,
    });
  }
  handleClick() {
    this.setState(preState => ({
      checked: !preState.checked,
    }), () => {
      this.props.checkHandle(this.props.id);
    });
  }
  render() {
    const { hideDone, content, id } = this.props;
    const className = hideDone ? 'hidden' : '';
    return (
      <li className={className}>
        <input
          type="checkbox"
          className="checkbox"
          value={id}
          checked={this.state.checked}
          onChange={this.handleClick}
        />
        {content}
        <button className="edit" onClick={this.onEditClick}>编辑</button>
        <button className="delete-btn" value={id}>删除</button>
      </li>
    );
  }
}
TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  hideDone: PropTypes.bool.isRequired,
  editHandle: PropTypes.func.isRequired,
  checkHandle: PropTypes.func.isRequired,
};

export default List;
