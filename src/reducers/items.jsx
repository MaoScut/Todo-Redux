import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/actionTypes';

const initialState = [];
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case ActionTypes.GET_ITEMS:
//       return action.items.slice();
//     // case ActionTypes.CHECK:
//     default:
//       return state;
//   }
// }

const reducer = handleActions({
  // [ActionTypes.GET_ITEMS](state, action) {
  // 如果是用redux-thunk或者是redux-promise， 数据在这里取得， 
  // 如果是saga的话，那么在receive items的action中获取
  // return action.payload;
  // },
  [ActionTypes.RECEIVE_ITEMS](state, action) {
    return action.payload;
  },
  // [ActionTypes.SAVE](state, action) {
  //   return action.payload;
  // },
  // [ActionTypes.DELETE](state, action) {
  //   return action.payload;
  // },
}, initialState);
export default reducer;
