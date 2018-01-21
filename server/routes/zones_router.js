'use strict';

const zone_router = require("express").Router(),
      zone        = require("../models/zone.js"),
      npc         = require("../models/npc.js");


zone_router.delete("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) => {
  zone.deleteSpawnentry(req.params.spawngroupID, req.params.npcID).then(data => {
    res.status(200).type('json').json(data);
  });
});

// zone_router.put("/spawn/spawngroup/spawnentries", (req, res, next) => {
//   zone.updateSpawnentries(req.params.spawngroupID, req.params.npcID).then(data => {
//     res.status(200).type('json').json(data);
//   });
// });

zone_router.put("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) => {
  zone.updateSpawnentry(req.params.spawngroupID, req.params.npcID).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.post("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) => {
  zone.insertSpawnentry(req.params.spawngroupID, req.params.npcID).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn/spawngroup/:spawngroupID/spawnentry", (req, res, next) => {
  zone.getSpawnentries(req.params.spawngroupID).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.delete("/spawn/spawngroup/:id", (req, res, next) => {
  zone.deleteSpawngroup(req.params.id).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.put("/spawn/spawngroup/:id", async (req, res, next) => {
  const responses = [];
  if (req.body.spawngroup) {
    responses[0] = await zone.updateSpawngroup(req.params.id, req.body.spawngroup);
  } else {
    responses[0] = null;
  }
  if (req.body.spawnentries) {
    const entries = req.body.spawnentries;
    for (let i = 0, len = entries.length; i < len; i++) {
      responses[i + 1] = await zone.updateSpawnentry(entries[i].spawngroupID, entries[i].npcID, entries[i].chance);
    }
  }
  res.status(200).type('json').json(responses);
});

zone_router.post("/spawn/:spawn2ID/spawngroup", (req, res, next) => {
  zone.insertSpawngroup(req.params.spawn2ID, req.body.zone).then(data => {
    res.status(200).type('json').json(data);
  }).catch(error => {
    
  });
});

zone_router.get("/spawn/spawngroup/:id", (req, res, next) => {
  zone.selectSpawngroup(req.params.id).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn/spawngroup/options/search/:searchTerm", (req, res, next) => {
  zone.searchSpawngroupOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  }).catch(error => {

  });
});

zone_router.delete("/spawn/spawn2/:id", (req, res, next) => {
  zone.deleteSpawn2(req.params.id).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.put("/spawn/spawn2/:id", (req, res, next) => {
  zone.updateSpawn2(req.params.id, req.body).then(data => {
    res.status(200).type('json').json(data);
  }).catch(error => {
    
  });
});

zone_router.post("/:zoneName/spawn/spawn2/", (req, res, next) => {
  zone.insertSpawn2(req.params.zoneName).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn/spawn2/:id", (req, res, next) => {
  zone.selectSpawn2(req.params.id).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn/:spawn2ID", async (req, res, next) => {
  let spawn2, spawngroup;

  spawn2 = (await zone.selectSpawn2(req.params.spawn2ID))[0];

  if (spawn2.spawngroupID) {
    spawngroup = (await zone.selectSpawngroup(spawn2.spawngroupID))[0];
    spawngroup.spawnentries = await zone.getSpawnentries(spawngroup.id);
  } else {
    spawngroup = null
  }

  res.status(200).type('json').json({ spawn2, spawngroup });
});

zone_router.get("/spawngroup/tree/:spawngroupID", (req, res, next) => {
  zone.getSingleSpawngroupTree(req.params.spawngroupID).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn2/tree/:spawn2ID", (req, res, next) => {
  zone.getSingleSpawn2Tree(req.params.spawn2ID).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/spawn/tree/:zoneName", (req, res, next) => {
  zone.getSpawnTree(req.params.zoneName).then(data => {
    res.status(200).type('json').json(data);
  });
});

zone_router.get("/fishing/:zoneName", (req, res, next) => {
  zone.getFishingTable(req.params.zoneName).then(data => {
    res.status(200).type('json').json(data)
  });
});

zone_router.get("/forage/:zoneName", (req, res, next) => {
  zone.getForageTable(req.params.zoneName).then(data => {
    res.status(200).type('json').json(data)
  });
});

zone_router.get("/list", (req, res, next) => {
  zone.getZoneList().then(data => {
    res.status(200).type('json').json(data)
  });
});

module.exports = zone_router;