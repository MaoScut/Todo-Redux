import * as ActionTypes from '../actions/actionTypes';

const initialState = '0/0';
export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.STATICS:
      return action.donePercent;
    default: return state;
  }
}
