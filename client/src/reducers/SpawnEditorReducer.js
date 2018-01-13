import {
  SPAWNEDITOR_RESET,
  SPAWNEDITOR_LOAD_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    spawn: {}
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case SPAWNEDITOR_RESET:
      return get_INITIAL_STATE();
    case SPAWNEDITOR_UNLOAD_SPAWN:
      return {
        ...state,
        isLoaded: false,
        spawn: {}
      }
    case SPAWNEDITOR_LOAD_SPAWN:
      return {
        ...state,
        isLoaded: true,
        spawn: action.payload ? action.payload : {}
      }
    default:
      return state;
  }
}