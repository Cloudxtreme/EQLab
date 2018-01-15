import {
  NPCEDITOR_RESET,
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  // NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_SET_SPELLSET_OPTIONS,
  NPCEDITOR_SET_EFFECTSET_OPTIONS,
  NPCEDITOR_SET_LOOTTABLE_OPTIONS
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    npc: {},
    spellsetOptions: [],
    effectsetOptions: [],
    loottableOptions: []
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
        spellsetOptions: action.payload.spells ? [{ id: action.payload.spells.id, label: `${action.payload.spells.name} (${action.payload.spells.id})` }] : [],
        effectsetOptions: action.payload.effects ? [{ id: action.payload.effects.id, label: `${action.payload.effects.name} (${action.payload.effects.id})` }] : [],
        loottableOptions: action.payload.loot ? [{ id: action.payload.loot.id, label: `${action.payload.loot.name} (${action.payload.loot.id})` }] : []
      }
    case NPCEDITOR_UNLOAD_NPC:
      return get_INITIAL_STATE();
    case NPCEDITOR_SET_SPELLSET_OPTIONS:
      return {
        ...state,
        spellsetOptions: action.options ? action.options : []
      }
    case NPCEDITOR_SET_EFFECTSET_OPTIONS:
      return {
        ...state,
        effectsetOptions: action.options ? action.options : []
      }
    case NPCEDITOR_SET_LOOTTABLE_OPTIONS:
      return {
        ...state,
        loottableOptions: action.options ? action.options : []
      }
    default:
      return state;
  }
}