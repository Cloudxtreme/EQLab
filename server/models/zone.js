'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js'),
      fs        = require('fs-extra'),
      path      = require('path'),
      D3Node    = require('d3-node'),
      _         = require('lodash'),
      __mapsdir = path.resolve(__filesdir + '/maps');

  
/*****************************************************************************/

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
    let spawn2tree  = new Treeize();
    spawn2tree = spawn2tree.grow(SQLdata[0]).getData();
    return spawn2tree[0];
  },

  getSingleSpawngroupTree: async (spawngroupID) => {
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

  searchSpawngroupOptions: async (searchTerm) => {
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
  },

  renderZoneMap: (zoneName) => {
    /*
    There are two types of entries in the map files; Lines (L) and points (P). 
    A line consists of two points (start and end) with each three coordinates (a 3D vector), followed by a color code. 
    A point consists of one point with three coordinates, followed by a color code, a font size and a label.
  
    A coordinate in the map is in the form of Y, X, Z, and is different from the in-game /loc coordinate. 
    First, the X and Y coordinates are swapped. 
    Second, they are multiplied by -1, meaning that 100 /loc translates into -100 in the map file.
  
    Color codes are in the form of R (red), G (green), B (blue), meaning that 0, 0, 0 is black, and 255, 255, 255 is white.
    Font sizes have three possible values: 1, 2 and 3, where 1 is the smallest (and borderline unreadable), and 3 is the largest.
    Labels are written with underscores instead of spaces.
    */
    return new Promise((resolve, reject) => {
  
      let xArr = [], yArr = [];
      let x_min, x_max;
      let y_min, y_max;
      let dimensions;
    
      let points, pArr, pCoordsArr, p, pColorArr, pColor, pFontSize, pLabel;
      let lines, lArr, lCoordsArr, p1Arr, p1, p2Arr, p2, lColorArr, lColor;
    
    
      fs.readFile(path.resolve(__mapsdir + `/${zoneName}.txt`))
        .then(data => {
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
          })
    
          // Calculate Dimensions of SVG, adding some extra for margins
          for (let i = 0, len = points.length; i < len; i++) {
            xArr.push(points[i].p.x);
            yArr.push(points[i].p.y);
          }
          for (let i = 0, len = lines.length; i < len; i++) {
            xArr.push(lines[i].p1.x, lines[i].p2.x);
            yArr.push(lines[i].p1.y, lines[i].p2.y);
          }
    
          x_min = _.min(xArr);
          x_max = _.max(xArr);
          y_min = _.min(yArr);
          y_max = _.max(yArr);
          
          dimensions = {
            width: Math.floor(Math.abs(x_min) + Math.abs(x_max)),
            height: Math.floor(Math.abs(y_min) + Math.abs(y_max))
          }
    
          // Create SVG
          const d3n = new D3Node({ styles:'.test {fill:#808080;}' });
          // <svg xmlns="http://www.w3.org/2000/svg" zoomAndPan="magnify" viewBox="0,-150,1000,1000" width="1000" height="1000">
          // viewBox="200,-100,500,500" width="1000" height="1000"
          

          // console.log(dimensions)
          let svg = d3n.createSVG(1900, 1200)
                      // .attr('viewBox', `${(dimensions.width/2)*-1},${(dimensions.height/2)*-1},${dimensions.width},${dimensions.height}`)
                      .attr('viewBox', `-875,-600,1900,1200`)
                      .attr('preserveAspectRatio', 'xMidYMid meet')
                      .attr('style', 'border-style:solid;border-width:5px');
 
          svg
            .append('circle')
            .attr('r', 10)

          // Create Lines
          for (let i = 0, len = lines.length; i < len; i++) {
            let line = lines[i];
            svg
              .append('line')
              .attr('x1', line.p1.x)
              .attr('y1', line.p1.y)
              .attr('z1', line.p1.z)
              .attr('x2', line.p2.x)
              .attr('y2', line.p2.y)
              .attr('z2', line.p2.z)
              .attr('style', `stroke:rgb(${line.color.r},${line.color.g},${line.color.b});stroke-width:1`)
          }

          // Create Points
          for (let i = 0, len = points.length; i < len; i++) {
            let point = points[i];
            svg
              .append('circle')
              .attr('cx', point.p.x)
              .attr('cy', point.p.y)
              .attr('z', point.p.z)
              .attr('r', 2)
          }

          // Stringify SVG
          svg = d3n.svgString();
          resolve(svg);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
      
}