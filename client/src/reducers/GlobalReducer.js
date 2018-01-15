import {
  GLOBAL_RESET,
  GLOBAL_LOAD
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    altCurrency: []
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case GLOBAL_RESET:
      return get_INITIAL_STATE();
    case GLOBAL_LOAD:
      return {
        ...state,
        altCurrency: action.globalVars ? action.globalVars.altCurrency : []
      }
    default:
      return state;
  }
}