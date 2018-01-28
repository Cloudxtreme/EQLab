'use strict';

const express       = require("express"),
      spells_router = express.Router(),
      spell         = require("../models/spell.js");


/*******************************************************************/

/*************************** SPELL ********************************/

spells_router.delete("/:spellID", (req, res, next) => {
  spell.delete(req.params.spellID).then(data => {
    res.status(200).type('json').json(data);
  });
});

spells_router.put("/:spellID", (req, res, next) => {
  spell.update(req.params.spellID, req.body).then(data => {
    res.status(200).type('json').json(data);
  });
});

// spells_router.post("/copy/:spellID", (req, res, next) => {
//   spell.copy(req.params.npcID).then(newSpellID => {
//     spell.select([], { id: newSpellID }).then(newSpell => {
//       res.status(200).type('json').json(newSpell);
//     });
//   });
// });

spells_router.post("/", (req, res, next) => {
  spell.insert(req.body).then(newSpellID => {
    spell.select([], { id: newSpellID }).then(newSpell => {
      res.status(200).type('json').json(newSpell);
    });
  });
});

spells_router.post("/search", (req, res, next) => {
  spell.search(req.body).then(data => {
    res.status(200).type('json').json(data);
  });
});

// 114 - Shock of Swords
spells_router.get("/:spellID", (req, res, next) => {
  spell.select([], {id: req.params.spellID}).then(spell => {
    res.status(200).type('json').json(spell);
  });
});

// 114 - Shock of Swords
spells_router.get("/:spellID", async (req, res, next) => {
  const spell = await spell.select([], { id: req.params.spellID });
  res.status(200).type('json').json({
    "spell": spell
    // "recourse": await spell.select([], { id: spell.RecourseLink }),
    // "effects": await npc.getEffects(type.npc_spells_effects_id),
    // "loot": await npc.getLoot(type.loottable_id),
    // "merchant": await npc.getMerchantTable(type.merchant_id),
    // "faction": await npc.getFactions(type.npc_faction_id),
    // "emotes": await npc.getEmotes(type.emoteid),
    // "tint": await npc.getTints(type.armortint_id)
  });
});

module.exports = spells_router;