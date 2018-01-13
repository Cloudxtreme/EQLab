import {
  GLOBAL_RESET,
  GLOBAL_LOAD_NPC,
  GLOBAL_UNLOAD_NPC
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return { 
    npc: {}
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case GLOBAL_RESET:
      return get_INITIAL_STATE();
    case GLOBAL_LOAD_NPC:
      return {
        ...state,
        npc: action.payload ? action.payload : {}
      }
    case GLOBAL_UNLOAD_NPC:
      return {
        ...state,
        npc: {}
      }
    default:
      return state;
  }
}