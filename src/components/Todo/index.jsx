import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import CreateTodo from '../CreateTodo';
import Editor from '../Editor';
import './main.scss';

// only Todo can reach store and action!

class Todo extends React.Component {
  componentDidMount() {
    this.props.actions.getItems();
    // console.log('didmount');
    // this.props.actions.statics();
  }
  // componentDidUpdate() {
  //   console.log('didupdate');
  //   this.props.actions.statics();
  // }
  render() {
    return (
      <div className="todo-container">
        <List
          items={this.props.items}
          hideDone={this.props.edit.hideAchievedItems}
          hideHandle={this.props.actions.hide}
          editHandle={this.props.actions.showEditor}
          checkHandle={this.props.actions.check}
          deleteHandle={this.props.actions.deleteItem}
        />
        {(this.props.edit.isEditing ? <Editor
          item={this.props.edit.selectedItem}
          onSave={this.props.actions.save}
          onCancel={this.props.actions.cancelEdit}
        /> : null)}
        <CreateTodo onCreate={this.props.actions.create} />
      </div>
    );
  }
}
Todo.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    content: PropTypes.string,
    checked: PropTypes.bool,
  })).isRequired,
  edit: PropTypes.shape({
    hideAchievedItems: PropTypes.bool,
    selectedItem: PropTypes.isRequired,
    isEditing: PropTypes.bool,
  }).isRequired,
};

export default Todo;
