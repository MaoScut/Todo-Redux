import uuid from 'uuid';
import * as storage from '../stores/storage';
import * as ActionTypes from './actionTypes';

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
export function showEditor(selectedItem) {
  return {
    type: ActionTypes.SHOW_EDITOR,
    selectedItem,
  };
}
export function hide() {
  return {
    type: ActionTypes.TOGGLE_ACHIEVED_ITEMS,
  };
}

export function save(item) {
  return (dispatch) => {
    storage.getItemArray().then((result) => {
      if (item.id) {
        const index = result.findIndex(v => v.id === item.id);
        const newResult = result.slice();
        newResult[index] = item;
        return storage.setItemArray(newResult);
      }
      return storage.setItemArray(result.concat(Object.assign({}, item, {
        id: uuid.v4(), checked: false,
      })));
    }).then(result => dispatch(createGetItemsAction(result)));
  };
}
export function check(id) {
  return (dispatch) => {
    storage.getItemArray().then((result) => {
      const index = result.findIndex(v => v.id === id);
      const newResult = result.slice();
      newResult[index].checked = !newResult[index].checked;
      return storage.setItemArray(newResult);
    }).then(result => dispatch(createGetItemsAction(result)));
  };
}
export function create() {
  return {
    type: ActionTypes.CREATE,
  };
}
export function cancelEdit() {
  return {
    type: ActionTypes.CANCEL_EDIT,
  };
}
export function statics() {
  return (dispatch) => {
    storage.getItemArray().then((result) => {
      const doneNum = result.filter(v => v.checked).length;
      dispatch({
        type: ActionTypes.STATICS,
        donePercent: String(doneNum).concat('/', result.length),
      });
    });
  };
}
export function deleteItem(id) {
  return (dispatch) => {
    storage.getItemArray().then((result) => {
      const newResult = result.filter(v => v.id !== id);
      return storage.setItemArray(newResult);
    }).then(result => dispatch(createGetItemsAction(result)));
  };
}
