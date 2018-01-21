import {
  NPCAPP_LOAD,
  NPCAPP_UNLOAD,
  NPCAPP_SEARCH_SET_NPCLIST,
  NPCAPP_SEARCH_SET_NPCID
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    npcList: [],
    npcID: null
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case NPCAPP_UNLOAD:
      return get_INITIAL_STATE();
    case NPCAPP_LOAD:
      return {
        ...state,
        isLoaded: true
      }
    case NPCAPP_SEARCH_SET_NPCLIST:
      return {
        ...state,
        npcList: action.payload ? action.payload : []
      }
    case NPCAPP_SEARCH_SET_NPCID:
      return {
        ...state,
        npcID: action.npcID ? action.npcID : null
      }   
    default:
      return state;
  }
}