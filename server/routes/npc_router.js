'use strict';

const express    = require("express"),
      npc_router = express.Router(),
      npc        = require("../models/npc.js");

npc_router.get("/spellsets/search/:searchTerm", (req, res, next) => {
  npc.searchNPCSpells(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npc_router.get("/search/:searchTerm", (req, res, next) => {
  npc.searchNPCs(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

npc_router.get("/:npcID/merchanttable", (req, res, next) => {
  npc.getMerchantTable(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/:npcID/factions", (req, res, next) => {
  npc.getFactions(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/:npcID/emotes", (req, res, next) => {
  npc.getEmotes(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/:npcID/tints", (req, res, next) => {
  npc.getTints(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/:npcID/passives", (req, res, next) => {
  npc.getPassives(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});     

npc_router.get("/:npcID/spells", (req, res, next) => {
  npc.getSpells(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});      
 
npc_router.get("/:npcID/loot", (req, res, next) => {
  npc.getLootTableTree(req.params.npcID).then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/tintlist", (req, res, next) => {
  npc.getTintList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/altcurrencylist", (req, res, next) => {
  npc.getAltCurrencyList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/racelist", (req, res, next) => {
  npc.getRaceList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/factionlist", (req, res, next) => {
  npc.getNPCFactionList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/spelllist", (req, res, next) => {
  npc.getNPCSpellList().then(data => {
    res.status(200).type('json').json(data)
  })
});

npc_router.get("/passivelist", (req, res, next) => {
  npc.getNPCPassiveList().then(data => {
    res.status(200).type('json').json(data)
  })
});

// Overking Bathezid 103056
npc_router.get("/:npcID", async (req, res, next) => {
  res.status(200).type('json').json({
    "type": await npc.select([], { id: req.params.npcID }),
    "spells": await npc.getSpells(req.params.npcID),
    "effects": await npc.getEffects(req.params.npcID),
    "loot": await npc.getLootTableTree(req.params.npcID),
    "merchant": await npc.getMerchantTable(req.params.npcID),
    "faction": await npc.getFactions(req.params.npcID),
    "emotes": await npc.getEmotes(req.params.npcID),
    "tintset": await npc.getTints(req.params.npcID)
  })
});

module.exports = npc_router;