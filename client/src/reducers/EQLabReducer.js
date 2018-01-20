import {
  EQLAB_UNLOAD,
  EQLAB_SET_VARS
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    dbName: '',
    altCurrency: []
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case EQLAB_UNLOAD:
      return get_INITIAL_STATE();
    case EQLAB_SET_VARS:
      return {
        ...state,
        dbName: action.globalVars ? action.globalVars.dbName : '',
        altCurrency: action.globalVars ? action.globalVars.altCurrency : []
      }
    default:
      return state;
  }
}