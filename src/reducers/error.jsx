import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/actionTypes';

const initialState = [];
const reducer = handleActions({
  [ActionTypes.ERROR](state, action) {
    return state.concat(action.payload);
  },
}, initialState);
export default reducer;
