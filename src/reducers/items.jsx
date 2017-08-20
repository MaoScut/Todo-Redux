import * as ActionTypes from '../actions/actionTypes';

const initialState = [];
export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ITEMS:
      return action.items.slice();
    // case ActionTypes.CHECK:
    default:
      return state;
  }
}
