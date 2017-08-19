import React from 'react';
import PropTypes from 'prop-types';

function Editor({ item, onSave, onCancel }) {
  let updateInput = null;
  function save() {
    if (updateInput.value !== '') {
      onSave({
        ...item,
        content: updateInput.value,
      });
    }
  }
  return (
    <div>
      <input
        type="text"
        ref={(input) => { updateInput = input; }}
        defaultValue={item ? item.content : ''}
      />{item ? '输入修改' : '输入待办事项'}
      <button onClick={save}>{item ? '更新' : '保存'}</button>
      <button onClick={onCancel}>取消</button>
    </div>
  );
}
Editor.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default Editor;
