import {
  SPELLAPP_LOAD,
  SPELLAPP_UNLOAD,
  SPELLAPP_SEARCH_SET_SPELLLIST,
  SPELLAPP_SEARCH_REFRESH_SPELLLIST,
  SPELLAPP_SEARCH_FILTER_SPELLLIST,
  SPELLAPP_SEARCH_SET_SPELLID,
} from '../constants/actionTypes';

function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    spellList: [],
    searchSpellID: null
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case SPELLAPP_UNLOAD:
      return get_INITIAL_STATE();
    case SPELLAPP_LOAD:
      return {
        ...state,
        isLoaded: true
      }
    case SPELLAPP_SEARCH_SET_SPELLLIST:
      return {
        ...state,
        spellList: action.payload ? action.payload : []
      }
    case SPELLAPP_SEARCH_REFRESH_SPELLLIST:
      return {
        ...state,
        spellList: state.spellList.map(spell => {
          if (spell.id === action.spell.id) {
            return action.spell
          }
          return spell
        })
      }
    case SPELLAPP_SEARCH_FILTER_SPELLLIST:
      return {
        ...state,
        spellList: state.spellList.filter(spell => spell.id !== action.spellID),
        searchSpellID: null
      }
    case SPELLAPP_SEARCH_SET_SPELLID:
      return {
        ...state,
        searchSpellID: action.spellID ? action.spellID : null
      }
    default:
      return state;
  }
}