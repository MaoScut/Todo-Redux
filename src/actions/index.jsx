// import uuid from 'uuid';
import { createAction } from 'redux-actions';
import * as storage from '../stores/storage';
import * as ActionTypes from './actionTypes';

export const getItems = createAction(ActionTypes.GET_ITEMS, () => storage.getItemArray());
export const showEditor = createAction(ActionTypes.SHOW_EDITOR, selectedItem => selectedItem);
export const hide = createAction(ActionTypes.TOGGLE_ACHIEVED_ITEMS);
export const save = createAction(ActionTypes.SAVE, item => storage.addOrUpdateItem(item));
export const check = createAction(ActionTypes.CHECK, id => storage.toggleChecked(id));
export const create = createAction(ActionTypes.CREATE);
export const cancelEdit = createAction(ActionTypes.CANCEL_EDIT);
export const deleteItem = createAction(ActionTypes.DELETE, id => storage.deleteItem(id));

// function createGetItemsAction(items) {
//   return {
//     type: ActionTypes.GET_ITEMS,
//     items,
//   };
// }

// export function getItems() {
//   return dispatch =>
//     storage.getItemArray().then(results => dispatch(createGetItemsAction(results)));
// }

// export function showEditor(selectedItem) {
//   return {
//     type: ActionTypes.SHOW_EDITOR,
//     selectedItem,
//   };
// }
// 注意第二个参数的语法，返回值等价于payload

// export function hide() {
//   return {
//     type: ActionTypes.TOGGLE_ACHIEVED_ITEMS,
//   };
// }

// export function save(item) {
//   return (dispatch) => {
//     storage.addOrUpdateItem(item)
//       .then(result => dispatch(createGetItemsAction(result)))
//       .then(() => dispatch({
//         type: ActionTypes.SAVE,
//       }));
//   };
// }
// 这里更新完成后怎么自动去触发重新获取数据？？
// const basicSave = createAction(ActionTypes.SAVE);

// function createCheckAction() {
//   return {
//     type: ActionTypes.CHECK,
//   };
// }
// export function check(id) {
//   return (dispatch) => {
//     storage.toggleChecked(id)
//       // .then(result => dispatch(createGetItemsAction(result)));
//       .then(result => dispatch(createCheckAction(result)));
//   };
// }

// export function create() {
//   return {
//     type: ActionTypes.CREATE,
//   };
// }

// export function cancelEdit() {
//   return {
//     type: ActionTypes.CANCEL_EDIT,
//   };
// }

// export function statics() {
//   return (dispatch) => {
//     storage.getItemArray().then((result) => {
//       const doneNum = result.filter(v => v.checked).length;
//       dispatch({
//         type: ActionTypes.STATICS,
//         donePercent: String(doneNum).concat('/', result.length),
//       });
//     });
//   };
// }
// export const statics = createAction(ActionTypes.STATICS, () => storage.getDonePercent());
// export function deleteItem(id) {
//   return (dispatch) => {
//     storage.deleteItem(id).then(result => dispatch(createGetItemsAction(result)));
//   };
// }
