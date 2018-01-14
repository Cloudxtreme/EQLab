import {
  NPCEDITOR_RESET,
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  // NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_SET_SPELLSET_OPTIONS
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    npc: {},
    spellsetOptions: [],
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case NPCEDITOR_RESET:
      return get_INITIAL_STATE();
    case NPCEDITOR_LOAD_NPC:
      return {
        ...state,
        isLoaded: true,
        npc: action.payload ? action.payload : {},
        spellsetOptions: action.payload.spells ? [{ id: action.payload.spells.id, label: `${action.payload.spells.name} (${action.payload.spells.id})` }] : []
      }
    case NPCEDITOR_UNLOAD_NPC:
      return {
        ...state,
        isLoaded: false,
        npc: {},
        spellsetOptions: []
      }
    case NPCEDITOR_SET_SPELLSET_OPTIONS:
      return {
        ...state,
        spellsetOptions: action.options ? action.options : []
      }
    default:
      return state;
  }
}