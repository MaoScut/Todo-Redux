import * as ActionTypes from './actionTypes';

export function getItems() {
  return {
    type: ActionTypes.GET_ITEMS,
  };
}
export function receiveItems(items) {
  return {
    type: ActionTypes.RECEIVE_ITEMS,
    payload: items,
  };
}
export function deleteItem(id) {
  return {
    type: ActionTypes.DELETE,
    payload: id,
  };
}

export function showEditor(item) {
  return {
    type: ActionTypes.SHOW_EDITOR,
    payload: item,
  };
}

export function hide() {
  return {
    type: ActionTypes.TOGGLE_ACHIEVED_ITEMS,
  };
}

export function save(item) {
  return {
    type: ActionTypes.SAVE,
    payload: item,
  };
}

export function check(id) {
  return {
    type: ActionTypes.CHECK,
    payload: id,
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
