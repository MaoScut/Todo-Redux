import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isEditing: false,
  selectedItem: null,
  hideAchievedItems: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_EDITOR:
      return Object.assign({}, state, {
        isEditing: true,
        selectedItem: action.selectedItem,
      });
    case ActionTypes.SAVE:
      return Object.assign({}, state, {
        isEditing: false,
        selectedItem: null,
      });
    case ActionTypes.TOGGLE_ACHIEVED_ITEMS:
      return Object.assign({}, state, {
        hideAchievedItems: !state.hideAchievedItems,
      });
    case ActionTypes.CREATE:
      return Object.assign({}, state, { isEditing: true });
    case ActionTypes.CANCEL_EDIT:
      return {
        ...state,
        isEditing: false,
      };
    default: return initialState;
  }
}

