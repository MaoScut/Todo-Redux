import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as storage from '../stores/storage';
import * as ActionTypes from '../actions/actionTypes';
import { receiveItems } from '../actions/pureAction';

function* receiveAllItems() {
  const items = yield storage.getItemArray();
  yield put(receiveItems(items));
}
function* afterSave(action) {
  const items = yield storage.addOrUpdateItem(action.payload);
  yield put(receiveItems(items));
}
function* afterDelete(action) {
  const items = yield storage.deleteItem(action.payload);
  yield put(receiveItems(items));
}
function* afterCheck(action) {
  const items = yield storage.toggleChecked(action.payload);
  yield put(receiveItems(items));
}
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
