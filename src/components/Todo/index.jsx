import React from 'react';
import PropTypes from 'prop-types';
// import * as TodoStore from '../../stores/TodoStore';
// import TodoAction from '../../actions/TodoAction';
import Statics from '../Statics';
import List from '../List';
import CreateTodo from '../CreateTodo';
import Editor from '../Editor';
import './main.scss';

// only Todo can reach store and action!
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.getItems();
    this.props.actions.statics();
  }
  handleClick(e) {
    const targetClassName = e.target.className;
    switch (targetClassName) {
      case 'delete-btn': this.props.actions.deleteItem(e.target.value);
        break;
      case 'checkbox': this.props.actions.check(e.target.value);
        break;
      default:
    }
  }
  render() {
    return (
      <div onClick={this.handleClick} role="presentation">
        <List
          items={this.props.items}
          hideDone={this.props.edit.hideAchievedItems}
          hideHandle={this.props.actions.hide}
          editHandle={this.props.actions.showEditor}
        />
        {(this.props.edit.isEditing ? <Editor
          item={this.props.edit.selectedItem}
          onSave={this.props.actions.save}
          onCancel={this.props.actions.cancelEdit}
        /> : null)}
        <CreateTodo onCreate={this.props.actions.create} />
        <Statics donePercent={this.props.statics} />
      </div>
    );
  }
}
// function Todo({actions, state }) {
//   const
// }
// class Todo extends React.Component {
//   componentDidMount() {
//     this.props.actions.getItems();
//   }
//   render() {
//     const items = this.props.items;
//     return (
//       <div>
//         {items.map(v => (<p>{v.content}</p>))}
//       </div>
//     );
//   }
// }
Todo.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    content: PropTypes.string,
    checked: PropTypes.bool,
  })).isRequired,
  edit: PropTypes.shape({
    hideAchievedItems: PropTypes.bool,
    // selectedItem: PropTypes.shape({
    //   key: PropTypes.string,
    //   content: PropTypes.string,
    //   checked: PropTypes.bool,
    // }).isRequired,
    selectedItem: PropTypes.isRequired,
    isEditing: PropTypes.bool,
  }).isRequired,
  statics: PropTypes.string.isRequired,
};

export default Todo;
