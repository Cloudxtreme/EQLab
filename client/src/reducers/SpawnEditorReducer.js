import {
  SPAWNEDITOR_LOAD_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS,
  SPAWNEDITOR_SET_NPC_OPTIONS
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    spawn: {},
    spawngroupOptions: [],
    npcOptions: []
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case SPAWNEDITOR_UNLOAD_SPAWN:
      return get_INITIAL_STATE();
    case SPAWNEDITOR_LOAD_SPAWN:
      return {
        ...state,
        isLoaded: true,
        spawn: action.payload ? action.payload : {},
        spawngroupOptions: action.payload.spawn2.spawngroupID ? [{ id: action.payload.spawn2.spawngroupID, label: `${action.payload.spawngroup.name} (${action.payload.spawn2.spawngroupID})` }] : []
      }
    case SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS:
      return {
        ...state,
        spawngroupOptions: action.options ? action.options : []
      }
    case SPAWNEDITOR_SET_NPC_OPTIONS:
      return {
        ...state,
        npcOptions: action.options ? action.options : []
      }
    default:
      return state;
  }
}