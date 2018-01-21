// ZONE APP
export const getZoneAppStatus = (state) => state.ZoneApp.isLoaded;
export const getCurrentZone = (state) => state.ZoneApp.zone;
export const getCurrentSpawnsID = (state) => state.ZoneApp.spawnsID;

// NPC APP
export const getNPCAppStatus = (state) => state.NPCApp.isLoaded;
export const getCurrentNPCID = (state) => state.NPCApp.npcID;