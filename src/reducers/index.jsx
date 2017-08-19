import { combineReducers } from 'redux';
import items from './items';
import edit from './edit';
import statics from './statics';

export default combineReducers({
  items,
  edit,
  statics,
});
