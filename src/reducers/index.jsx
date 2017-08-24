import { combineReducers } from 'redux';
import items from './items';
import edit from './edit';
import statics from './statics';
import error from './error';

export default combineReducers({
  items,
  edit,
  statics,
  error,
});
