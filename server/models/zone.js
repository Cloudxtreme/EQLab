'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js');

module.exports = {

  getZoneList: async () => {
    return await db.select('zone', ['id', 'zoneidnumber', 'short_name', 'long_name'], {});
  },

  getFishingTable: async (zoneName) => {
    let queryStr = `
    SELECT fishing.id, fishing.skill_level, fishing.chance, fishing.Itemid AS 'item_id', items.Name AS 'item_name', 
    fishing.npc_chance, fishing.npc_id, npc_types.name AS 'npc_name'
    FROM zone
    LEFT JOIN fishing ON fishing.zoneid = zone.zoneidnumber
    LEFT JOIN npc_types ON npc_types.id = fishing.npc_id
    LEFT JOIN items ON items.id = fishing.Itemid
    WHERE zone.short_name = '${zoneName}'
    `;

    let SQLdata = await db.raw(queryStr);
    // return sanitize(SQLdata[0]);
    return SQLdata[0];
  },

  getForageTable: async (zoneName) => {
    let queryStr = `
    SELECT forage.id, forage.level, forage.chance, forage.Itemid, items.Name
    FROM zone
    LEFT JOIN forage ON forage.zoneid = zone.zoneidnumber
    LEFT JOIN items ON items.id = forage.Itemid
    WHERE zone.short_name = '${zoneName}'
    `;

    let SQLdata = await db.raw(queryStr);
    return sanitize(SQLdata[0]);
  },

  getTraps: async (zoneName) => {
    let queryStr = `
    SELECT forage.id, forage.level, forage.chance, forage.Itemid, items.Name
    FROM zone
    LEFT JOIN forage ON forage.zoneid = zone.zoneidnumber
    LEFT JOIN items ON items.id = forage.Itemid
    WHERE zone.short_name = '${zoneName}'
    `;

    let SQLdata = await db.raw(queryStr);
    return sanitize(SQLdata[0]);
  },

  getSpawnTree: async (zoneName) => {
    let queryStr = `
    SELECT spawn2.id AS 'id', spawn2.zone, spawn2.version, spawn2.enabled, spawngroup.id AS 'spawngroup:id', 
    spawngroup.name AS 'spawngroup:name', spawnentry.chance AS 'spawngroup:spawnentries:chance', 
    spawnentry.npcID AS 'spawngroup:spawnentries:npc_id', npc_types.name AS 'spawngroup:spawnentries:npc_name',
    npc_types.level AS 'spawngroup:spawnentries:npc_level', npc_types.maxlevel AS 'spawngroup:spawnentries:npc_maxlevel'
    FROM spawn2
    LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
    LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
    LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
    WHERE spawn2.zone = '${zoneName}'
    `;

    let SQLdata = await db.raw(queryStr);
    let spawntree  = new Treeize();
    // SQLdata[0] = sanitize(SQLdata[0]);
    spawntree = spawntree.grow(SQLdata[0]).getData();
    return spawntree
  },

  getSingleSpawn2Tree: async (spawn2ID) => {
    let queryStr = `
    SELECT spawn2.id AS 'id', spawn2.zone, spawn2.version, spawn2.enabled, spawngroup.id AS 'spawngroup:id', 
    spawngroup.name AS 'spawngroup:name', spawnentry.chance AS 'spawngroup:spawnentries:chance', 
    spawnentry.npcID AS 'spawngroup:spawnentries:npc_id', npc_types.name AS 'spawngroup:spawnentries:npc_name',
    npc_types.level AS 'spawngroup:spawnentries:npc_level', npc_types.maxlevel AS 'spawngroup:spawnentries:npc_maxlevel'
    FROM spawn2
    LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
    LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
    LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
    WHERE spawn2.id = '${spawn2ID}'
    `;

    let SQLdata = await db.raw(queryStr);
    let spawntree  = new Treeize();
    spawntree = spawntree.grow(SQLdata[0]).getData();
    return spawntree[0];
  },

  getSpawnData: async (spawn2ID) => {
    let queryStr = `
    SELECT spawn2.id AS 'spawn2id', spawn2.spawngroupID AS 'spawn2spawngroupID', spawn2.zone AS 'spawn2zone', 
    spawn2.version AS 'spawn2version',
    spawn2.x AS 'spawn2x', spawn2.y AS 'spawn2y', spawn2.z AS 'spawn2z', spawn2.heading AS 'spawn2heading', 
    spawn2.respawntime AS 'spawn2respawntime', spawn2.variance AS 'spawn2variance', spawn2.pathgrid AS 'spawn2pathgrid', 
    spawn2._condition AS 'spawn2_condition', spawn2.cond_value AS 'spawn2cond_value', spawn2.enabled AS 'spawn2enabled',
    spawn2.animation AS 'spawn2animation', spawngroup.id AS 'spawngroupid', spawngroup.name AS 'spawngroupname', 
    spawngroup.spawn_limit AS 'spawngroupspawn_limit', spawngroup.dist AS 'spawngroupdist', spawngroup.max_x AS 'spawngroupmax_x', 
    spawngroup.min_x AS 'spawngroupmin_x', spawngroup.max_y AS 'spawngroupmax_y', spawngroup.min_y AS 'spawngroupmin_y', 
    spawngroup.delay AS 'spawngroupdelay', spawngroup.mindelay AS 'spawngroupmindelay', spawngroup.despawn AS 'spawngroupdespawn',
    spawngroup.despawn_timer AS 'spawngroupdespawn_timer', spawnentry.spawngroupID AS 'spawnentryspawngroupID', 
    spawnentry.npcID AS 'spawnentrynpcID', spawnentry.chance AS 'spawnentrychance', 
    npc_types.name AS 'npc_typesname', npc_types.level AS 'npc_typeslevel', npc_types.maxlevel AS 'npc_typesmaxlevel'
    FROM spawn2
    LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
    LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
    LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
    WHERE spawn2.id = '${spawn2ID}'
    `;

    let SQLdata      = await db.raw(queryStr),
        spawnentries = sanitize(SQLdata[0]),
        spawn2 = spawnentries[0] || false,
        spawn = {
          spawn2: {},
          spawngroup: {}
        }

    spawn.spawn2 = {
      "id": spawn2.spawn2id,
      "spawngroupID": spawn2.spawn2spawngroupID.toString(),
      "zone": spawn2.spawn2zone,
      "version": spawn2.spawn2version,
      "x": spawn2.spawn2x,
      "y": spawn2.spawn2y,
      "z": spawn2.spawn2z,
      "heading": spawn2.spawn2heading,
      "respawntime": spawn2.spawn2respawntime,
      "variance": spawn2.spawn2variance,
      "pathgrid": spawn2.spawn2pathgrid,
      "_condition": spawn2.spawn2_condition,
      "cond_value": spawn2.spawn2cond_value,
      "enabled": spawn2.spawn2enabled,
      "animation": spawn2.spawn2animation
    };

    if (spawn2.spawn2spawngroupID) {
      spawn.spawngroup = {
        "id": spawn2.spawngroupid,
        "name": spawn2.spawngroupname,
        "spawn_limit": spawn2.spawngroupspawn_limit,
        "dist": spawn2.spawngroupdist,
        "max_x": spawn2.spawngroupmax_x,
        "min_x": spawn2.spawngroupmin_x,
        "max_y": spawn2.spawngroupmax_y,
        "min_y": spawn2.spawngroupmin_y,
        "delay": spawn2.spawngroupdelay,
        "mindelay": spawn2.spawngroupmindelay,
        "despawn": spawn2.spawngroupdespawn,
        "despawn_timer": spawn2.spawngroupdespawn_timer,
        "spawnentries": spawnentries.map(entry => {
          return {
            "spawngroupID": entry.spawnentryspawngroupID,
            "npcID": entry.spawnentrynpcID,
            "chance": entry.spawnentrychance,
            "name": entry.npc_typesname,
            "level": entry.npc_typeslevel,
            "maxlevel": entry.npc_typesmaxlevel
          }
        })
      }
    } else {
      spawn.spawngroup = false;
    }
    return spawn;
  },

  selectSpawn2: async (id) => {
    return await db.select('spawn2', null, { id });
  },

  insertSpawn2: async (zone = null) => {
    return await db.insert('spawn2', { id: null, zone });
  },

  updateSpawn2: async (id, values) => {
    if (id) {
      return await db.update('spawn2', values, { id });
    }
  },

  deleteSpawn2: async (id) => {
    return await db.delete('spawn2', { id });
  },

  searchSpawngroups: async (searchTerm) => {
    let queryStr=`
    SELECT id, name
    FROM spawngroup
    WHERE id LIKE '${searchTerm}%'
    OR name LIKE '%${searchTerm}%'
    `
    
    let results = await db.raw(queryStr);
    return results[0];
  },

  selectSpawngroup: async (id) => {
    return await db.select('spawngroup', null, { id });
  },

  insertSpawngroup: async (spawn2ID, zone = 'noZone', values) => {
    if (spawn2ID) {
      let name = `${zone}_${Date.now().toString()}`;
      let newSpawngroupID = await db.insert('spawngroup', { id: null, name });
      return await db.update('spawn2', { spawngroupID: newSpawngroupID }, { id: spawn2ID })
    } else {
      console.log('skipped if')
      // return await db.insert('spawngroup', [{ id: null }]);
    }
  },

  updateSpawngroup: async (id, values) => {
    if (id) {
      return await db.update('spawngroup', values, { id });
    }
  },

  deleteSpawngroup: async (id) => {
    await db.delete('spawnentry', { spawngroupID: id });
    await db.delete('spawngroup', { id });
    return await db.update('spawn2', { spawngroupID: null }, { spawngroupID: id })
  },

  getSpawnentries: async (spawngroupID) => {
    let queryStr = `
    SELECT spawnentry.*, npc_types.name, npc_types.level, npc_types.maxlevel
    FROM spawnentry
    LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
    WHERE spawnentry.spawngroupID = '${spawngroupID}'
    `
    return (await db.raw(queryStr))[0];
  },

  insertSpawnentry: async (spawngroupID, npcID) => {
    let test = await db.insert('spawnentry', { spawngroupID, npcID });
    console.log(test)
  },

  updateSpawnentry: async (spawngroupID, npcID, chance) => {
    if (spawngroupID && npcID) {
      return await db.update('spawnentry', { chance }, { spawngroupID, npcID });
    }
  },

  deleteSpawnentry: async (spawngroupID, npcID) => {
    return await db.delete('spawnentry', { spawngroupID, npcID });
  }
      
}