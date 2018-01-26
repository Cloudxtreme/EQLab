import {
  NPCAPP_LOAD,
  NPCAPP_UNLOAD,
  NPCAPP_SET_PANE,
  NPCAPP_SEARCH_SET_NPCLIST,
  NPCAPP_SEARCH_REFRESH_NPCLIST,
  NPCAPP_SEARCH_FILTER_NPCLIST,
  NPCAPP_SEARCH_SET_NPCID,
  NPCAPP_CREATE_LOAD,
  NPCAPP_CREATE_UNLOAD,
  NPCAPP_CREATE_SET_NPC_OPTIONS,
  NPCAPP_CREATE_ADD_NPCLIST,
  NPCAPP_CREATE_REFRESH_NPCLIST,
  NPCAPP_CREATE_FILTER_NPCLIST,
  NPCAPP_CREATE_SET_NPC,
  NPCAPP_CREATE_ADD_NPCTEMPLATE,
  NPCAPP_CREATE_SET_NPCTEMPLATE,
  NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST,
  NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    pane: 'search',
    npcList: [],
    searchnpcID: null,
    newNPCs: [],
    npcTemplates: [],
    npcOptions: [],
    createnpcID: null,
    createTemplateID: null
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
    case NPCAPP_SET_PANE:
      return {
        ...state,
        pane: action.pane ? action.pane : 'search',
        searchnpcID: null,
        createnpcID: null,
        createTemplateID: null
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
        newNPCs: [],
        npcTemplates: [],
        npcOptions: [],
        createnpcID: null,
        createTemplateID: null
      } 
    case NPCAPP_CREATE_SET_NPC_OPTIONS:
      return {
        ...state,
        npcOptions: action.options ? action.options : []
      }
    case NPCAPP_CREATE_ADD_NPCLIST:
      return {
        ...state,
        newNPCs: action.newNPC ? [...state.newNPCs, action.newNPC] : [...state.newNPCs]
      } 
    case NPCAPP_CREATE_REFRESH_NPCLIST:
      return {
        ...state,
        newNPCs: state.newNPCs.map(npc => {
          if (npc.id === action.npc.id) {
            return action.npc
          }
          return npc
        })
      }
    case NPCAPP_CREATE_FILTER_NPCLIST:
      return {
        ...state,
        newNPCs: state.newNPCs.filter(npc => npc.id !== action.npcID),
        createnpcID: null
      }
    case NPCAPP_CREATE_SET_NPC:
      return {
        ...state,
        createTemplateID: null,
        createnpcID: action.npcID ? action.npcID : null
      } 
    case NPCAPP_CREATE_ADD_NPCTEMPLATE:
      return {
        ...state,
        npcTemplates: action.npcTemplate ? [...state.npcTemplates, action.npcTemplate] : [...state.npcTemplates]
      } 
    case NPCAPP_CREATE_SET_NPCTEMPLATE:
      return {
        ...state,
        createnpcID: null,
        createTemplateID: action.templateID ? action.templateID : null
      }
    case NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST:
      return {
        ...state,
        npcTemplates: state.npcTemplates.map(template => {
          if (template.id === action.template.id) {
            return action.template
          }
          return template
        })
      }
    case NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST:
      return {
        ...state,
        npcTemplates: state.npcTemplates.filter(template => template.id !== action.templateID),
        createTemplateID: null
      }
    default:
      return state;
  }
}