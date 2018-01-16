import {
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_SET_FACTION_OPTIONS,
  NPCEDITOR_SET_TINT_OPTIONS,
  NPCEDITOR_SET_SPELLSET_OPTIONS,
  NPCEDITOR_SET_EFFECTSET_OPTIONS,
  NPCEDITOR_SET_LOOTTABLE_OPTIONS
} from '../constants/actionTypes';


function get_INITIAL_STATE() {
  return {
    isLoaded: false,
    npc: {},
    factionOptions: [],
    tintOptions: [],
    spellsetOptions: [],
    effectsetOptions: [],
    loottableOptions: []
  }
}

export default (state = get_INITIAL_STATE(), action) => {
  switch (action.type) {
    case NPCEDITOR_UNLOAD_NPC:
      return get_INITIAL_STATE();
    case NPCEDITOR_LOAD_NPC:
      return {
        ...state,
        isLoaded: true,
        npc: action.payload ? action.payload : {},
        factionOptions: action.payload.faction ? [{ id: action.payload.faction.id, label: `${action.payload.faction.name} (${action.payload.faction.id})` }] : [],
        tintOptions: action.payload.tint ? [{ id: action.payload.tint.id, label: `${action.payload.tint.tint_set_name} (${action.payload.tint.id})` }] : [],
        spellsetOptions: action.payload.spells ? [{ id: action.payload.spells.id, label: `${action.payload.spells.name} (${action.payload.spells.id})` }] : [],
        effectsetOptions: action.payload.effects ? [{ id: action.payload.effects.id, label: `${action.payload.effects.name} (${action.payload.effects.id})` }] : [],
        loottableOptions: action.payload.loot ? [{ id: action.payload.loot.id, label: `${action.payload.loot.name} (${action.payload.loot.id})` }] : []
      }
    case NPCEDITOR_SET_FACTION_OPTIONS:
      return {
        ...state,
        factionOptions: action.options ? action.options : []
      }
    case NPCEDITOR_SET_TINT_OPTIONS:
      return {
        ...state,
        tintOptions: action.options ? action.options : []
      }
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