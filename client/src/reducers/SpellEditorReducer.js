import {
  SPELLEDITOR_LOAD_SPELL,
  SPELLEDITOR_UNLOAD_SPELL
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    isTemplate: undefined,
    spell: {}
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case SPELLEDITOR_UNLOAD_SPELL:
      return get_INITIAL_STATE();
    case SPELLEDITOR_LOAD_SPELL:
      return {
        ...state,
        isLoaded: true,
        isTemplate: action.isTemplate,
        spell: action.payload ? action.payload : {}
      }
    default:
      return state;
  }
}