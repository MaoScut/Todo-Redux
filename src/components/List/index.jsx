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
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      hideDone: this.props.hideDone,
    };
    this.captureBubble = this.captureBubble.bind(this);
    this.toggleBtnHandleClick = this.toggleBtnHandleClick.bind(this);
    // ::this.captureBubble;
  }
  // 当组件拥有自己的state的时候，传递进来的props改变时，它是不会重新渲染的，要用这个方法！
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      hideDone: nextProps.hideDone,
    });
  }
  componentDidUpdate() {
    const { items, clickItemId } = this.state;
    // const item = items.find(v => v.id === clickItemId);
    // if (clickItemId) this.props.checkHandle(clickItemId);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 什么时候不用更新呢？
    // 如果这一次从store传过来的不等于自己的state，好像没办法做到？？
    // 记录一下具体问题
    // 假设现在操作目标是一个没有勾选的box，一些事件的触发顺序
    // 捕捉到box的点击，调用自己的setState，改变完自己的state后，
    // 一小段时间后，分派action去修改store，store数据改变，再次触发setState，因为这两个数据一致，看起来就像没更新
    // 如果是两次点击的话，自己状态复原后，会收到第一次点击分派的action导致的数据更新，状态不一致，改变了
    // 然后再收到第二次点击分派的action，才变回来
    // 所以会闪一下
  }
  captureBubble(e) {
    // const className = e.target.className;
    // switch (className) {
    //   case 'delete-btn': this.props.deleteHandle(e.target.value); break;
    //   case 'checkbox': this.props.checkHandle(e.target.value); break;
    //   case 'edit-btn': this.props.editHandle(this.state.items.find(v => v.id === e.target.value)); break;
    //   default:
    // }
    e.stopPropagation();
    if (e.target.className === 'checkbox') {
      // 在setState中别用e
      const targetId = e.target.value;
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
    // 缺陷：虽然可以马上响应改变，但是如果没勾选，然后连续点击两次，会闪一下勾选的状态，再变会没勾选
  }
  toggleBtnHandleClick() {
    this.setState(preState => this.setState({
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
  hideHandle: PropTypes.func.isRequired,
  editHandle: PropTypes.func.isRequired,
  checkHandle: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
};

export default List;
