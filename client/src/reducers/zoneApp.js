import {
  ZONEAPP_RESET,
  ZONEAPP_SET_ZONE,
  ZONEAPP_BUILD_SPAWNTREE,
  ZONEAPP_CLEAR_SPAWNTREE,
  ZONEAPP_ADD_SPAWN2,
  ZONEAPP_REFRESH_SPAWN2,
  ZONEAPP_REMOVE_SPAWN2
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return { 
    zone: '',
    spawnTree: []
  }
}

// export default function (state = get_INITIAL_STATE(), action) {
//   return {
//       main: todosReducer(state.todos, action),
//       spawns: visibilityReducer(state.visibilityFilter, action)
//   };
// }

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case ZONEAPP_RESET:
      return get_INITIAL_STATE();
    case ZONEAPP_SET_ZONE:
      return {
        ...state,
        zone: action.zone ? action.zone : ''
      }
    case ZONEAPP_BUILD_SPAWNTREE:
      return {
        ...state,
        spawnTree: action.spawnTree ? action.spawnTree : []
      }
    case ZONEAPP_CLEAR_SPAWNTREE:
      return {
        ...state,
        spawnTree: []
      }
    case ZONEAPP_ADD_SPAWN2:
      return {
        ...state,
        spawnTree: action.data ? [...state.spawnTree, action.data] : [...state.spawnTree]
      }
    case ZONEAPP_REFRESH_SPAWN2:
      return {
        ...state,
        spawnTree: state.spawnTree.map(spawn2 => {
          if (spawn2.id === action.spawn2.id) {
            return action.spawn2
          }
          return spawn2
        })
      }
    case ZONEAPP_REMOVE_SPAWN2:
      return {
        ...state,
        spawnTree: state.spawnTree.filter(spawn2 => spawn2.id !== action.spawn2ID)
      }
    default:
      return state;
  }
}


