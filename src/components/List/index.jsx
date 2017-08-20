import React from 'react';
import PropTypes from 'prop-types';
import Statics from '../Statics';
import TodoItem from '../TodoItem';

// function List({ items, hideHandle, hideDone, editHandle, checkHandle }) {
//   let doneNum = 0;
//   const list = items.map((item) => {
//     const { id, content, checked } = item;
//     if (checked) doneNum += 1;
//     return (
//       <TodoItem
//         key={id}
//         id={id}
//         content={content}
//         checked={checked}
//         hideDone={hideDone}
//         editHandle={editHandle}
//         checkHandle={checkHandle}
//       />
//     );
//   });
//   const buttonText = hideDone ? '显示已完成事项' : '隐藏已完成事项';
//   const donePercent = String(doneNum).concat('/', items.length);
//   return (
//     <div>
//       <ul>
//         {list}
//       </ul>
//       <Statics donePercent={donePercent} />
//       <button onClick={() => hideHandle()}>{buttonText}</button>
//     </div>
//   );
// }
//  bubble list
// 传入items，事件
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      hideDone: this.props.hideDone,
    };
    this.captureBubble = this.captureBubble.bind(this);
    this.toggleBtnHandleClick = this.toggleBtnHandleClick.bind(this);
    // es7
    // this.captureBubble = ::this.captureBubble;
    // this.toggleBtnHandleClick = ::this.toggleBtnHandleClick;
  }
  // 当组件拥有自己的state的时候，传递进来的props改变时，它是不会重新渲染的，要用这个方法！
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      hideDone: nextProps.hideDone,
    });
  }
  captureBubble(e) {
    e.stopPropagation();
    const className = e.target.className;
    const targetId = e.target.value;
    if (className.includes('checkbox')) {
      // 在setState中别用e     
      this.setState((preState) => {
        const index = preState.items.findIndex(v => v.id === targetId);
        const newItems = preState.items.slice();
        newItems[index].checked = !newItems[index].checked;
        return {
          items: newItems,
          clickItemId: targetId,
        };
      }, () => this.props.checkHandle(targetId));
    }
    if (className.includes('edit')) {
      const item = this.state.items.find(v => v.id === targetId);
      this.props.editHandle(item);
    }
    if (className.includes('delete')) {
      this.setState(preState => ({
        items: preState.items.filter(v => v.id !== targetId),
      }), () => this.props.deleteHandle(targetId));
    }
    // 缺陷：虽然可以马上响应改变，但是如果没勾选，然后连续点击两次，会闪一下勾选的状态，再变会没勾选
  }
  toggleBtnHandleClick(e) {
    e.stopPropagation();
    this.setState(preState => ({
      hideDone: !preState.hideDone,
    }));
  }
  render() {
    let doneNum = 0;
    const buttonText = this.state.hideDone ? '显示已完成事项' : '隐藏已完成事项';
    const itemList = this.state.items.map((item) => {
      if (item.checked) doneNum += 1;
      return (<TodoItem
        key={item.id}
        item={item}
        hideDone={this.state.hideDone}
      />);
    });
    const donePercent = String(doneNum).concat('/', itemList.length);
    return (
      <div onClick={this.captureBubble} role="presentation">
        <ul>
          {itemList}
        </ul>
        <Statics donePercent={donePercent} />
        <button onClick={this.toggleBtnHandleClick}>{buttonText}</button>
      </div>
    );
  }
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
  // hideHandle: PropTypes.func.isRequired,
  editHandle: PropTypes.func.isRequired,
  checkHandle: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
};

export default List;
