'use strict';

const express       = require("express"),
      npcs_router   = express.Router(),
      npc           = require("../models/npc.js"),
      npc_template  = require("../models/sequelize").npc_template;


/*******************************************************************************/   

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

/**************************** OPTIONS **********************************/

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

/**************************** TEMPLATES **********************************/

npcs_router.delete("/templates/:templateID", async (req, res, next) => {
  npc_template.destroy({where: {id: req.params.templateID}}).then(data => {
    res.status(200).type('json').json(data);
  });
});

npcs_router.put("/templates/:templateID", async (req, res, next) => {
  npc_template.update(req.body, {where: {id: req.params.templateID}}).then(data => {
    res.status(200).type('json').json(data);
  });
});

npcs_router.post("/templates/:templateID", async (req, res, next) => {
  let template = (await npc_template.findById(req.params.templateID)).get();
  delete template.id;
  let newID = await npc.insert(template);
  let newNPC = await npc.select([], { id: newID });
  res.status(200).type('json').json(newNPC);
});

npcs_router.post("/templates", (req, res, next) => {
  npc_template.create({name: 'New Template'}).then(data => {
    res.status(200).type('json').json(data.get());
  })
});

npcs_router.get("/templates/:templateID", async (req, res, next) => {
  const type = (await npc_template.findById(req.params.templateID)).get();
  res.status(200).type('json').json({
    "type": type,
    "spells": await npc.getSpells(type.npc_spells_id),
    "effects": await npc.getEffects(type.npc_spells_effects_id),
    "loot": await npc.getLoot(type.loottable_id),
    "merchant": await npc.getMerchantTable(type.merchant_id),
    "faction": await npc.getFactions(type.npc_faction_id),
    "emotes": await npc.getEmotes(type.emoteid),
    "tint": await npc.getTints(type.armortint_id)
  });
});

npcs_router.get("/templates", (req, res, next) => {
  npc_template.findAll({raw: true}).then(data => {
    res.status(200).type('json').json(data)
  })
});

/**************************** NPC **********************************/

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
  npc.copy(req.params.npcID).then(newNPCID => {
    npc.select([], { id: newNPCID }).then(newNPC => {
      res.status(200).type('json').json(newNPC)
    });
  });
});

npcs_router.post("/", (req, res, next) => {
  npc.insert(req.body).then(newNPCID => {
    npc.select([], { id: newNPCID }).then(newNPC => {
      res.status(200).type('json').json(newNPC)
    });
  });
});

// Overking Bathezid 103056
npcs_router.get("/:npcID", async (req, res, next) => {
  const type = await npc.select([], { id: req.params.npcID });
  res.status(200).type('json').json({
    "type": type,
    "spells": await npc.getSpells(type.npc_spells_id),
    "effects": await npc.getEffects(type.npc_spells_effects_id),
    "loot": await npc.getLoot(type.loottable_id),
    "merchant": await npc.getMerchantTable(type.merchant_id),
    "faction": await npc.getFactions(type.npc_faction_id),
    "emotes": await npc.getEmotes(type.emoteid),
    "tint": await npc.getTints(type.armortint_id)
  });
});

module.exports = npcs_router;