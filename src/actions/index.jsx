import * as storage from '../stores/storage';
import * as ActionTypes from './actionTypes';
// actions:
// delete：删除一个列表项，传入id
// check：勾选一个列表项，传入id
// showEditor：显示编辑组件
// hideAchieveItem：隐藏已经完成的项目
// save：保存新建列表项或者是更新
// cancelEdit：取消编辑
// create：新建一个列表项，和showEditor合并
// getItems：获得所有列表项

function createGetItemsAction(items) {
  return {
    type: ActionTypes.GET_ITEMS,
    items,
  };
}

export function getItems() {
  return dispatch =>
    storage.getItemArray().then(results => dispatch(createGetItemsAction(results)));
}
export function g(){}
