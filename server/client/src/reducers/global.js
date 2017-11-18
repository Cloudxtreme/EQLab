import {
  GLOBAL_RESET,
  GLOBAL_LOAD_SPAWN,
  GLOBAL_UNLOAD_SPAWN,
  GLOBAL_LOAD_NPC,
  GLOBAL_UNLOAD_NPC
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return { 
    spawn: {},
    npc: {}
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case GLOBAL_RESET:
      return get_INITIAL_STATE();
    case GLOBAL_LOAD_SPAWN:
      return {
        ...state,
        spawn: action.payload ? action.payload : {}
      }
    case GLOBAL_UNLOAD_SPAWN:
      return {
        ...state,
        spawn: {}
      }
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