// ZONE APP
export const getZoneAppStatus = (state) => state.ZoneApp.isLoaded;
export const getCurrentZone = (state) => state.ZoneApp.zone;

// NPC APP
export const getNPCAppStatus = (state) => state.NPCApp.isLoaded;
export const getCurrentNPCID = (state) => state.NPCApp.npcID;

// SPAWN EDITOR
export const getCurrentSpawn2ID = (state) => state.SpawnEditor.spawn.spawn2.id;
export const getCurrentSpawngroupID = (state) => state.SpawnEditor.spawn.spawngroup.id;