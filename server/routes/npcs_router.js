'use strict';

const express       = require("express"),
      npcs_router   = express.Router(),
      npc           = require("../models/npc.js"),
      npc_template  = require("../models/sequelize").npc_template;


npcs_router.post("/templates", (req, res, next) => {
  npc_template.create(req.body, {raw: true}).then(data => {
    // res.status(200).type('json').json(data)
    console.log(data);
  })
});

npcs_router.get("/templates", (req, res, next) => {
  npc_template.findAll({raw: true}).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/effectset/options/search/:searchTerm", (req, res, next) => {
  npc.searchNPCEffectSetOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.get("/spellset/options/search/:searchTerm", (req, res, next) => {
  npc.searchNPCSpellSetOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.get("/tint/options/search/:searchTerm", (req, res, next) => {
  npc.searchNPCTintOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.get("/faction/options/search/:searchTerm", (req, res, next) => {
  npc.searchNPCFactionOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.get("/options/search/:searchTerm", (req, res, next) => {
  npc.searchNPCOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.get("/tint/list", (req, res, next) => {
  npc.getTintList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/race/list", (req, res, next) => {
  npc.getRaceList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/faction/list", (req, res, next) => {
  npc.getNPCFactionList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/spellset/list", (req, res, next) => {
  npc.getNPCSpellSetList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/effectset/list", (req, res, next) => {
  npc.getNPCEffectSetList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/:npcID/merchanttable", (req, res, next) => {
  npc.getMerchantTable(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/:npcID/factions", (req, res, next) => {
  npc.getFactions(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/:npcID/emotes", (req, res, next) => {
  npc.getEmotes(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/:npcID/tints", (req, res, next) => {
  npc.getTints(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.get("/:npcID/effects", (req, res, next) => {
  npc.getEffects(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});    

npcs_router.get("/:npcID/spells", (req, res, next) => {
  npc.getSpells(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});      
 
npcs_router.get("/:npcID/loot", (req, res, next) => {
  npc.getLoot(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npcs_router.delete("/:npcID", (req, res, next) => {
  npc.delete(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.put("/:npcID", (req, res, next) => {
  npc.update(req.params.npcID, req.body).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.post("/search", (req, res, next) => {
  npc.search(req.body).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.post("/copy/:npcID", (req, res, next) => {
  npc.copy(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  });
});

npcs_router.post("/", (req, res, next) => {
  npc.insert(req.body).then(data => {
    res.status(200).type('json').json(data)
  });
});

// Overking Bathezid 103056
npcs_router.get("/:npcID", async (req, res, next) => {
  res.status(200).type('json').json({
    "type": await npc.select([], { id: req.params.npcID }),
    "spells": await npc.getSpells(req.params.npcID),
    "effects": await npc.getEffects(req.params.npcID),
    "loot": await npc.getLoot(req.params.npcID),
    "merchant": await npc.getMerchantTable(req.params.npcID),
    "faction": await npc.getFactions(req.params.npcID),
    "emotes": await npc.getEmotes(req.params.npcID),
    "tint": await npc.getTints(req.params.npcID)
  })
});



module.exports = npcs_router;