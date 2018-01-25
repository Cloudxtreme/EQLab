import {
  NPCAPP_LOAD,
  NPCAPP_UNLOAD,
  NPCAPP_SEARCH_SET_NPCLIST,
  NPCAPP_SEARCH_REFRESH_NPCLIST,
  NPCAPP_SEARCH_FILTER_NPCLIST,
  NPCAPP_SEARCH_SET_NPCID,
  NPCAPP_CREATE_LOAD,
  NPCAPP_CREATE_UNLOAD,
  NPCAPP_CREATE_SET_NPC_OPTIONS,
  NPCAPP_CREATE_SET_NPC
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    npcList: [],
    searchnpcID: null,
    npcTemplates: [],
    npcOptions: [],
    createnpcID: null
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
    case NPCAPP_SEARCH_REFRESH_NPCLIST:
      return {
        ...state,
        npcList: state.npcList.map(npc => {
          if (npc.id === action.npc.id) {
            return action.npc
          }
          return npc
        })
      }
    case NPCAPP_SEARCH_FILTER_NPCLIST:
      return {
        ...state,
        npcList: state.npcList.filter(npc => npc.id !== action.npcID),
        searchnpcID: null
      }
    case NPCAPP_SEARCH_SET_NPCID:
      return {
        ...state,
        searchnpcID: action.npcID ? action.npcID : null
      }
    case NPCAPP_CREATE_LOAD:
      return {
        ...state,
        npcTemplates: action.npcTemplates ? action.npcTemplates : []
      } 
    case NPCAPP_CREATE_UNLOAD:
      return {
        ...state,
        npcTemplates: [],
        npcOptions: []
      } 
    case NPCAPP_CREATE_SET_NPC_OPTIONS:
      return {
        ...state,
        npcOptions: action.options ? action.options : []
      }
    case NPCAPP_CREATE_SET_NPC:
      return {
        ...state,
        createnpcID: action.npcID ? action.npcID : null
      } 
    default:
      return state;
  }
}