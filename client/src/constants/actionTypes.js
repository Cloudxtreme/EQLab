// AUTH
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REGISTER = 'AUTH_REGISTER';

// EQLAB
export const EQLAB_LOAD = 'EQLAB_LOAD';
export const EQLAB_UNLOAD = 'EQLAB_UNLOAD';
export const EQLAB_SET_VARS = 'EQLAB_SET_VARS';

// ZONE APP
export const ZONEAPP_LOAD = 'ZONEAPP_LOAD';
export const ZONEAPP_UNLOAD = 'ZONEAPP_UNLOAD';
export const ZONEAPP_SET_ZONELIST = 'ZONEAPP_SET_ZONELIST';
export const ZONEAPP_SELECT_ZONE = 'ZONEAPP_SELECT_ZONE';
export const ZONEAPP_SET_ZONE = 'ZONEAPP_SET_ZONE';
  // EDITOR
  export const ZONEAPP_EDITOR_LOAD = 'ZONEAPP_EDITOR_LOAD';
  export const ZONEAPP_EDITOR_UNLOAD = 'ZONEAPP_EDITOR_UNLOAD';
  export const ZONEAPP_EDITOR_SET_ZONEMAPDATA = 'ZONEAPP_EDITOR_SET_ZONEMAPDATA';
  // SPAWNS
  export const ZONEAPP_SPAWNS_BUILD_SPAWNTREE = 'ZONEAPP_SPAWNS_BUILD_SPAWNTREE';
  export const ZONEAPP_SPAWNS_REBUILD_SPAWNTREE = 'ZONEAPP_SPAWNS_REBUILD_SPAWNTREE';
  export const ZONEAPP_SPAWNS_SET_MODE = 'ZONEAPP_SPAWNS_SET_MODE';
  export const ZONEAPP_SPAWNS_CLEAR_SPAWNTREE = 'ZONEAPP_SPAWNS_CLEAR_SPAWNTREE';
  export const ZONEAPP_SPAWNS_POST_SPAWN2 = 'ZONEAPP_SPAWNS_POST_SPAWN2';
  export const ZONEAPP_SPAWNS_ADD_SPAWN2 = 'ZONEAPP_SPAWNS_ADD_SPAWN2';
  export const ZONEAPP_SPAWNS_GET_SPAWN2TREE = 'ZONEAPP_SPAWNS_GET_SPAWN2TREE';
  export const ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE = 'ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE';
  export const ZONEAPP_SPAWNS_REFRESH_SPAWN2 = 'ZONEAPP_SPAWNS_REFRESH_SPAWN2';
  export const ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP = 'ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP';
  export const ZONEAPP_SPAWNS_FILTER_SPAWN2 = 'ZONEAPP_SPAWNS_FILTER_SPAWN2';
  export const ZONEAPP_SPAWNS_FILTER_SPAWNGROUP = 'ZONEAPP_SPAWNS_FILTER_SPAWNGROUP';
  
// NPC APP
export const NPCAPP_LOAD = 'NPCAPP_LOAD';
export const NPCAPP_UNLOAD = 'NPCAPP_UNLOAD';
export const NPCAPP_SET_PANE = 'NPCAPP_SET_PANE';
  // SEARCH
  export const NPCAPP_SEARCH_SET_NPCLIST = 'NPCAPP_SEARCH_SET_NPCLIST';
  export const NPCAPP_SEARCH_REFRESH_NPCLIST = 'NPCAPP_SEARCH_REFRESH_NPCLIST';
  export const NPCAPP_SEARCH_FILTER_NPCLIST = 'NPCAPP_SEARCH_FILTER_NPCLIST';
  export const NPCAPP_SEARCH_SET_NPCID = 'NPCAPP_SEARCH_SET_NPCID';
  // CREATE
  export const NPCAPP_CREATE_LOAD = 'NPCAPP_CREATE_LOAD';
  export const NPCAPP_CREATE_UNLOAD = 'NPCAPP_CREATE_UNLOAD';
  export const NPCAPP_CREATE_SET_NPC_OPTIONS = 'NPCAPP_CREATE_SET_NPC_OPTIONS';
  export const NPCAPP_CREATE_POST_NPC = 'NPCAPP_CREATE_POST_NPC';
  export const NPCAPP_CREATE_ADD_NPCLIST = 'NPCAPP_CREATE_ADD_NPCLIST';
  export const NPCAPP_CREATE_REFRESH_NPCLIST = 'NPCAPP_CREATE_REFRESH_NPCLIST';
  export const NPCAPP_CREATE_FILTER_NPCLIST = 'NPCAPP_CREATE_FILTER_NPCLIST';
  export const NPCAPP_CREATE_COPY_NPC = 'NPCAPP_CREATE_COPY_NPC';
  export const NPCAPP_CREATE_SET_NPC = 'NPCAPP_CREATE_SET_NPC';
  export const NPCAPP_CREATE_SET_NPCTEMPLATE = 'NPCAPP_CREATE_SET_NPCTEMPLATE';
  export const NPCAPP_CREATE_POST_NPCTEMPLATE = 'NPCAPP_CREATE_POST_NPCTEMPLATE';
  export const NPCAPP_CREATE_ADD_NPCTEMPLATE = 'NPCAPP_CREATE_ADD_NPCTEMPLATE';
  export const NPCAPP_CREATE_COPY_NPCTEMPLATE = 'NPCAPP_CREATE_COPY_NPCTEMPLATE';
  export const NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST = 'NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST';
  export const NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST = 'NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST';

// SPELL APP
export const SPELLAPP_LOAD = 'SPELLAPP_LOAD';
export const SPELLAPP_UNLOAD = 'SPELLAPP_UNLOAD';
  // SEARCH
  export const SPELLAPP_SEARCH_SET_SPELLLIST = 'SPELLAPP_SEARCH_SET_SPELLLIST';
  export const SPELLAPP_SEARCH_REFRESH_SPELLLIST = 'SPELLAPP_SEARCH_REFRESH_SPELLLIST';
  export const SPELLAPP_SEARCH_FILTER_SPELLLIST = 'SPELLAPP_SEARCH_FILTER_SPELLLIST';
  export const SPELLAPP_SEARCH_SET_SPELLID = 'SPELLAPP_SEARCH_SET_SPELLID';

// SPAWN EDITOR
export const SPAWNEDITOR_LOAD_SPAWN = 'SPAWNEDITOR_LOAD_SPAWN';
export const SPAWNEDITOR_UNLOAD_SPAWN = 'SPAWNEDITOR_UNLOAD_SPAWN';
export const SPAWNEDITOR_GET_SPAWN2 = 'SPAWNEDITOR_GET_SPAWN2';
export const SPAWNEDITOR_UPDATE_SPAWN2 = 'SPAWNEDITOR_UPDATE_SPAWN2';
export const SPAWNEDITOR_REFRESH_SPAWN2 = 'SPAWNEDITOR_REFRESH_SPAWN2';
export const SPAWNEDITOR_DELETE_SPAWN2 = 'SPAWNEDITOR_DELETE_SPAWN2';
export const SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS = 'SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS';
export const SPAWNEDITOR_CHANGE_SPAWNGROUP = 'SPAWNEDITOR_CHANGE_SPAWNGROUP';
export const SPAWNEDITOR_POST_SPAWNGROUP = 'SPAWNEDITOR_POST_SPAWNGROUP';
export const SPAWNEDITOR_DELETE_SPAWNGROUP = 'SPAWNEDITOR_DELETE_SPAWNGROUP';
export const SPAWNEDITOR_SET_NPC_OPTIONS = 'SPAWNEDITOR_SET_NPC_OPTIONS';
export const SPAWNEDITOR_POST_SPAWNENTRY = 'SPAWNEDITOR_POST_SPAWNENTRY';
export const SPAWNEDITOR_DELETE_SPAWNENTRY = 'SPAWNEDITOR_DELETE_SPAWNENTRY';

// NPC EDITOR
export const NPCEDITOR_LOAD_NPC = 'NPCEDITOR_LOAD_NPC';
export const NPCEDITOR_UNLOAD_NPC = 'NPCEDITOR_UNLOAD_NPC';
export const NPCEDITOR_GET_NPC = 'NPCEDITOR_GET_NPC';
export const NPCEDITOR_GET_NPCTEMPLATE = 'NPCEDITOR_GET_NPCTEMPLATE';
export const NPCEDITOR_PATCH_NPC = 'NPCEDITOR_PATCH_NPC';
export const NPCEDITOR_PATCH_NPCTEMPLATE = 'NPCEDITOR_PATCH_NPCTEMPLATE';
export const NPCEDITOR_UPDATE_NPC = 'NPCEDITOR_UPDATE_NPC';
export const NPCEDITOR_UPDATE_NPCTEMPLATE = 'NPCEDITOR_UPDATE_NPCTEMPLATE';
export const NPCEDITOR_DELETE_NPC = 'NPCEDITOR_DELETE_NPC';
export const NPCEDITOR_DELETE_NPCTEMPLATE = 'NPCEDITOR_DELETE_NPCTEMPLATE';
export const NPCEDITOR_SET_FACTION_OPTIONS = 'NPCEDITOR_SET_FACTION_OPTIONS';
export const NPCEDITOR_SET_TINT_OPTIONS = 'NPCEDITOR_SET_TINT_OPTIONS';
export const NPCEDITOR_SET_SPELLSET_OPTIONS = 'NPCEDITOR_SET_SPELLSET_OPTIONS';
export const NPCEDITOR_SET_EFFECTSET_OPTIONS = 'NPCEDITOR_SET_EFFECTSET_OPTIONS';
export const NPCEDITOR_SET_LOOTTABLE_OPTIONS = 'NPCEDITOR_SET_LOOTTABLE_OPTIONS';

// SPELL EDITOR
export const SPELLEDITOR_LOAD_SPELL = 'SPELLEDITOR_LOAD_SPELL';
export const SPELLEDITOR_UNLOAD_SPELL = 'SPELLEDITOR_UNLOAD_SPELL';
export const SPELLEDITOR_GET_SPELL = 'SPELLEDITOR_GET_SPELL';
export const SPELLEDITOR_GET_SPELLTEMPLATE = 'SPELLEDITOR_GET_SPELLTEMPLATE';
export const SPELLEDITOR_PATCH_SPELL = 'SPELLEDITOR_PATCH_SPELL';
export const SPELLEDITOR_PATCH_SPELLTEMPLATE = 'SPELLEDITOR_PATCH_SPELLTEMPLATE';
export const SPELLEDITOR_UPDATE_SPELL = 'SPELLEDITOR_UPDATE_SPELL';
export const SPELLEDITOR_UPDATE_SPELLTEMPLATE = 'SPELLEDITOR_UPDATE_SPELLTEMPLATE';
export const SPELLEDITOR_DELETE_SPELL = 'SPELLEDITOR_DELETE_SPELL';
export const SPELLEDITOR_DELETE_SPELLTEMPLATE = 'SPELLEDITOR_DELETE_SPELLTEMPLATE';