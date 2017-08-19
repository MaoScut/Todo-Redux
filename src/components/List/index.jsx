import React from 'react';
import PropTypes from 'prop-types';

function List({ items, hideHandle, hideDone, editHandle }) {
  const list = items.map((item) => {
    const { id, content, checked } = item;
    return (
      <TodoItem
        key={id}
        id={id}
        content={content}
        checked={checked}
        hideDone={hideDone}
        editHandle={editHandle}
      />
    );
  });
  const buttonText = hideDone ? '显示已完成事项' : '隐藏已完成事项';
  return (
    <div>
      <ul>
        {list}
      </ul>
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
};

function TodoItem({ content, id, checked, hideDone, editHandle }) {
  const className = checked && hideDone ? 'hidden' : '';
  function onEditClick(e) {
    e.stopPropagation();
    editHandle({
      id,
      content,
      checked,
    });
  }
  return (
    <li className={className}>
      <input type="checkbox" className="checkbox" value={id} checked={checked} readOnly />
      {content}
      <button className="edit" onClick={onEditClick}>编辑</button>
      <button className="delete-btn" value={id}>删除</button>
    </li>
  );
}
TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  hideDone: PropTypes.bool.isRequired,
  editHandle: PropTypes.func.isRequired,
};

export default List;
