'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js'),
      fs        = require('fs-extra'),
      path      = require('path'),
      D3Node    = require('d3-node'),
      // d3        = require("d3"),
      _         = require('lodash'),
      __mapsdir = path.resolve(__filesdir + '/maps');

  
/*****************************************************************************/

const zone = {

  getZoneList: async () => {
    try {
      return await db.select('zone', ['id', 'zoneidnumber', 'short_name', 'long_name'], {});
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getZoneList(): ` + error);
    }
  },

  getFishingTable: async (zoneName) => {
    try {
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
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getFishingTable(${zoneName}): ` + error);
    }
  },

  getForageTable: async (zoneName) => {
    try {
      let queryStr = `
      SELECT forage.id, forage.level, forage.chance, forage.Itemid, items.Name
      FROM zone
      LEFT JOIN forage ON forage.zoneid = zone.zoneidnumber
      LEFT JOIN items ON items.id = forage.Itemid
      WHERE zone.short_name = '${zoneName}'
      `;
  
      let SQLdata = await db.raw(queryStr);
      return sanitize(SQLdata[0]);
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getForageTable(${zoneName}): ` + error);
    }
  },

  getTraps: async (zoneName) => {
    try {
      let queryStr = `
      SELECT forage.id, forage.level, forage.chance, forage.Itemid, items.Name
      FROM zone
      LEFT JOIN forage ON forage.zoneid = zone.zoneidnumber
      LEFT JOIN items ON items.id = forage.Itemid
      WHERE zone.short_name = '${zoneName}'
      `;
  
      let SQLdata = await db.raw(queryStr);
      return sanitize(SQLdata[0]);
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getTraps(${zoneName}): ` + error);
    }
  },

  getSpawnTree: async (zoneName) => {
    try {
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
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getSpawnTree(${zoneName}): ` + error);
    }
  },

  getSingleSpawn2Tree: async (spawn2ID) => {
    try {
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
      let spawn2tree  = new Treeize();
      spawn2tree = spawn2tree.grow(SQLdata[0]).getData();
      return spawn2tree[0];
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getSingleSpawn2Tree(${spawn2ID}): ` + error);
    }
  },

  getSingleSpawngroupTree: async (spawngroupID) => {
    try {
      let queryStr = `
      SELECT spawngroup.id, spawngroup.name, spawnentry.chance AS 'spawnentries:chance', 
      spawnentry.npcID AS 'spawnentries:npc_id', npc_types.name AS 'spawnentries:npc_name',
      npc_types.level AS 'spawnentries:npc_level', npc_types.maxlevel AS 'spawnentries:npc_maxlevel'
      FROM spawngroup
      LEFT JOIN spawnentry ON spawngroup.id = spawnentry.spawngroupID
      LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
      WHERE spawngroup.id = '${spawngroupID}'
      `;
  
      let SQLdata = await db.raw(queryStr);
      let spawngrouptree  = new Treeize();
      spawngrouptree = spawngrouptree.grow(SQLdata[0]).getData();
      return spawngrouptree[0];
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getSingleSpawngroupTree(${spawngroupID}): ` + error);
    }
  },

  getSpawnData: async (spawn2ID) => {
    try {
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
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getSpawnData(${spawn2ID}): ` + error);
    }
  },

  selectSpawn2: async (id) => {
    try {
      return await db.select('spawn2', null, { id });
    } catch (error) {
      throw new Error(`EQLab: Error in zone.selectSpawn2(${id}): ` + error);
    }
  },

  insertSpawn2: async (zone = null) => {
    try {
      return await db.insert('spawn2', { id: null, zone });
    } catch (error) {
      throw new Error(`EQLab: Error in zone.insertSpawn2(${zone}): ` + error);
    }
  },

  updateSpawn2: async (id, values) => {
    if (id) {
      try {
        return await db.update('spawn2', values, { id });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.updateSpawn2(${id}, ${values}): ` + error);
      }
    }
  },

  deleteSpawn2: async (id) => {
    if (id) {
      try {
        return await db.delete('spawn2', { id });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.deleteSpawn2(${id}): ` + error);
      }
    }
  },

  searchSpawngroupOptions: async (searchTerm) => {
    try {
      let queryStr=`
      SELECT id, name
      FROM spawngroup
      WHERE id LIKE '${searchTerm}%'
      OR name LIKE '%${searchTerm}%'
      `
      let results = await db.raw(queryStr);
      return results[0];
    } catch (error) {
      throw new Error(`EQLab: Error in zone.searchSpawngroupOptions(${searchTerm}): ` + error);
    }
  },

  selectSpawngroup: async (id) => {
    try {
      return await db.select('spawngroup', null, { id });
    } catch (error) {
      throw new Error(`EQLab: Error in zone.selectSpawngroup(${id}): ` + error);
    }
  },

  insertSpawngroup: async (spawn2ID, zone = 'noZone', values) => {
    try {
      if (spawn2ID) {

        let name = `${zone}_${Date.now().toString()}`;
        let newSpawngroupID = await db.insert('spawngroup', { id: null, name });
        return await db.update('spawn2', { spawngroupID: newSpawngroupID }, { id: spawn2ID })
      } else {
        // return await db.insert('spawngroup', [{ id: null }]);
      }
    } catch (error) {
      throw new Error(`EQLab: Error in zone.insertSpawngroup(${spawn2ID}, ${zone}, ${values}): ` + error);
    }
  },

  updateSpawngroup: async (id, values) => {
    if (id) {
      try {
        return await db.update('spawngroup', values, { id });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.updateSpawngroup(${id}, ${values}): ` + error);
      }  
    }
  },

  deleteSpawngroup: async (id) => {
    if (id) {
      try {
        await db.delete('spawnentry', { spawngroupID: id });
        await db.delete('spawngroup', { id });
        return await db.update('spawn2', { spawngroupID: null }, { spawngroupID: id })
      } catch (error) {
        throw new Error(`EQLab: Error in zone.deleteSpawngroup(${id}): ` + error);
      }
    }
  },

  getSpawnentries: async (spawngroupID) => {
    try {
      let queryStr = `
      SELECT spawnentry.*, npc_types.name, npc_types.level, npc_types.maxlevel
      FROM spawnentry
      LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
      WHERE spawnentry.spawngroupID = '${spawngroupID}'
      `
      return (await db.raw(queryStr))[0];
    } catch (error) {
      throw new Error(`EQLab: Error in zone.getSpawnentries(${spawngroupID}): ` + error);
    }
  },

  insertSpawnentry: async (spawngroupID, npcID) => {
    if (spawngroupID && npcID) {
      try {
        return await db.insert('spawnentry', { spawngroupID, npcID });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.insertSpawnentry(${spawngroupID}, ${npcID}): ` + error);
      }
    } 
  },

  updateSpawnentry: async (spawngroupID, npcID, chance) => {
    if (spawngroupID && npcID) {
      try {
        return await db.update('spawnentry', { chance }, { spawngroupID, npcID });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.updateSpawnentry(${spawngroupID}, ${npcID}): ` + error);
      } 
    }
  },

  deleteSpawnentry: async (spawngroupID, npcID) => {
    if (spawngroupID && npcID) {
      try {
        return await db.delete('spawnentry', { spawngroupID, npcID });
      } catch (error) {
        throw new Error(`EQLab: Error in zone.deleteSpawnentry(${spawngroupID}, ${npcID}): ` + error);
      }
    }
  },

  renderMapLayer: async (zoneName, layer) => {
      let filename;

      if (layer === 0) {
        filename = `/${zoneName}.txt`;
      } else {
        filename = `/${zoneName}_${layer}.txt`;
      }
  
      let xArr = [], yArr = [];
      let x_min, x_max;
      let y_min, y_max;
      let dimensions;
    
      let points, pArr, pCoordsArr, p, pColorArr, pColor, pFontSize, pLabel;
      let lines, lArr, lCoordsArr, p1Arr, p1, p2Arr, p2, lColorArr, lColor;
    
      let data = await fs.readFile(path.resolve(__mapsdir + filename));
      data = data.toString();

      // Find All Points
      points = data.match(/P\s.+/g).map(line => {

        pArr = line.slice(2).split(',').map(str => str.trim())

        pCoordsArr = pArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p = {x: pCoordsArr[1], y: pCoordsArr[0], z: pCoordsArr[2]};
  
        pColorArr = pArr.slice(3, 6);
        pColor = {r: parseInt(pColorArr[0], 10), g: parseInt(pColorArr[1], 10), b: parseInt(pColorArr[2], 10)}
  
        pFontSize = parseInt(pArr.slice(6)[0], 10);
        pLabel = pArr.pop();

        return {
          p,
          color: pColor,
          fontSize: pFontSize,
          label: pLabel
        }
      })
    
      // Find All Lines
      lines = data.match(/L\s.+/g).map(line => {

        lArr = line.slice(2).split(',').map(str => str.trim())

        p1Arr = lArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return coord;
        });
        p1 = {x: p1Arr[0], y: p1Arr[1], z: p1Arr[2]};
        
        p2Arr = lArr.slice(3, 6).map(coord => {
          if (coord == 0) return 0;
          return coord;
        });
        p2 = {x: p2Arr[0], y: p2Arr[1], z: p2Arr[2]};
  
        lColorArr = lArr.slice(6);
        lColor = {r: parseInt(lColorArr[0], 10), g: parseInt(lColorArr[1], 10), b: parseInt(lColorArr[2], 10)}
  
        return {
          p1,
          p2,
          color: lColor
        }
      });
    
          // Calculate Dimensions of SVG, adding some extra for margins
          // for (let i = 0, len = points.length; i < len; i++) {
          //   xArr.push(points[i].p.x);
          //   yArr.push(points[i].p.y);
          // }
          // for (let i = 0, len = lines.length; i < len; i++) {
          //   xArr.push(lines[i].p1.x, lines[i].p2.x);
          //   yArr.push(lines[i].p1.y, lines[i].p2.y);
          // }
    
          // x_min = _.min(xArr);
          // x_max = _.max(xArr);
          // y_min = _.min(yArr);
          // y_max = _.max(yArr);
          
          // dimensions = {
          //   width: Math.floor(Math.abs(x_min) + Math.abs(x_max)),
          //   height: Math.floor(Math.abs(y_min) + Math.abs(y_max))
          // }

      return { lines, points }
       
  },

  renderZoneMap: async (zoneName) => {
    
    // use fs to find number of layers
    // loop thru layers and call renderMapLayer(zoneName, layer) and append layers
    // Fetch and render existing zone data from db (spawns, traps, objects, etc)

    let baseData = {
      0: null,
      1: null,
      2: null,
      3: null
    };
    
    let entityData = {};

    let files = (await fs.readdir(__mapsdir)).filter(file => file.includes(zoneName));
    
    if (files.length) {
      for (let i = 0, len = files.length; i < len; i++) {
        baseData[i] = (await zone.renderMapLayer(zoneName, i));
        // console.log(i)
      }

      console.log(baseData)
      return baseData;
    }

    
    // return { baseData, entityData }
  }
      
}

module.exports = zone;