import {
  ZONEAPP_LOAD,
  ZONEAPP_UNLOAD,
  ZONEAPP_SET_ZONELIST,
  ZONEAPP_SET_ZONE,
  ZONEAPP_SPAWNS_SET_MODE,
  ZONEAPP_SPAWNS_BUILD_SPAWNTREE,
  ZONEAPP_SPAWNS_CLEAR_SPAWNTREE,
  ZONEAPP_SPAWNS_ADD_SPAWN2,
  ZONEAPP_SPAWNS_REFRESH_SPAWN2,
  ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP,
  ZONEAPP_SPAWNS_REMOVE_SPAWN2,
  ZONEAPP_SPAWNS_REMOVE_SPAWNGROUP
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return { 
    isLoaded: false,
    zone: '',
    zoneList: [],
    spawnTree: [],
    spawnsMode: '',
    spawnsID: null
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case ZONEAPP_UNLOAD:
      return get_INITIAL_STATE();
    case ZONEAPP_LOAD:
      return {
        ...state,
        isLoaded: true
      }
    case ZONEAPP_SET_ZONELIST:
      return {
        ...state,
        zoneList: action.zoneList ? action.zoneList : []
      }
    case ZONEAPP_SET_ZONE:
      return {
        ...state,
        zone: action.zone ? action.zone : ''
      }
    case ZONEAPP_SPAWNS_BUILD_SPAWNTREE:
      return {
        ...state,
        spawnTree: action.spawnTree ? action.spawnTree : []
      }
    case ZONEAPP_SPAWNS_CLEAR_SPAWNTREE:
      return {
        ...state,
        spawnTree: []
      }
    case ZONEAPP_SPAWNS_SET_MODE:
      return {
        ...state,
        spawnsMode: action.mode ? action.mode : '',
        spawnsID: action.spawnsID ? action.spawnsID : null
      }
    case ZONEAPP_SPAWNS_ADD_SPAWN2:
      return {
        ...state,
        spawnTree: action.data ? [...state.spawnTree, action.data] : [...state.spawnTree]
      }
    case ZONEAPP_SPAWNS_REFRESH_SPAWN2:
      return {
        ...state,
        spawnTree: state.spawnTree.map(spawn2 => {
          if (spawn2.id === action.spawn2.id) {
            return action.spawn2
          }
          return spawn2
        })
      }
    case ZONEAPP_SPAWNS_REMOVE_SPAWN2:
      return {
        ...state,
        spawnTree: state.spawnTree.filter(spawn2 => spawn2.id !== action.spawn2ID),
        spawnsMode: '',
        spawnsID: null
      }
    case ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP:
      return {
        ...state,
        spawnTree: state.spawnTree.map(spawn2 => {
          if (spawn2.spawngroup) {
            if (spawn2.spawngroup.id === action.spawngroup.id) {
              spawn2.spawngroup = action.spawngroup;
              return spawn2
            }
          }
          return spawn2
        })
      }
    case ZONEAPP_SPAWNS_REMOVE_SPAWNGROUP:
      return {
        ...state,
        spawnTree: state.spawnTree.map(spawn2 => {
          if (spawn2.spawngroup) {
            if (spawn2.spawngroup.id === action.spawngroupID) {
              spawn2.spawngroup = null;
              return spawn2
            }
          }
          return spawn2
        })
      }
    default:
      return state;
  }
}