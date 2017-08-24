import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as storage from '../stores/storage';
import * as ActionTypes from '../actions/actionTypes';
import { receiveItems, requestError } from '../actions/pureAction';

function* receiveAllItems() {
  const items = yield storage.getItemArray();
  yield put(receiveItems(items));
}
function* afterSave(action) {
  try {
    yield storage.addOrUpdateItem(action.payload);
  // yield put(receiveItems(items));
  } catch (e) {
    yield put(requestError(action));
  }
}
function* afterDelete(action) {
  try {
    yield storage.deleteItem(action.payload);
    // yield put(receiveItems(items));
  } catch (e) {
    yield put(requestError(action));
  }
}
function* afterCheck(action) {
  try {
    yield storage.toggleChecked(action.payload);
    // yield put(receiveItems(items));
  } catch (e) {
    yield put(requestError(action));
  }
}
// 很多action都是绑定同一个action的，怎么整合呢？
// 除了最初的getItems以外，实际上没有理由去重新渲染页面吧
// 然后这些请求失败了，要怎么做？
// 增加一个按钮，如果失败了，渲染它，然后按下去重新触发action？
// 增加一个error的action，payload放着上次失败的action就行了。
export function* watchFetchItems() {
  // yield* takeEvery('GET_ITEMS', receiveAllItems);
  yield [
    takeEvery(ActionTypes.GET_ITEMS, receiveAllItems),
    takeEvery(ActionTypes.SAVE, afterSave),
    takeEvery(ActionTypes.DELETE, afterDelete),
    takeEvery(ActionTypes.CHECK, afterCheck),
  ];
}
export default watchFetchItems;

// export default function* root() {
//   yield all([
//     fork(receiveAllItems),
//     fork(watchFetchItems),
//   ]);
// }
