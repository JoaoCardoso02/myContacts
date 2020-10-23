import { combineReducers } from 'redux';

function contacts(state = [], action) {
  switch(action.type) {
    case 'ADD_CONTACT_LIST':
      return [
        ...state,
        action.payload
      ];
    case 'ADD_NEW_LIST':
      return action.payload
    default:
      return state;
  }
}

const reducers = combineReducers({
  contacts
});

export default reducers;