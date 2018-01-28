'use strict';

const express       = require("express"),
      spells_router = express.Router(),
      spell         = require("../models/spell.js"),
      item          = require("../models/item.js");
      

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

spells_router.get("/search/:searchTerm", (req, res, next) => {
  spell.simpleSearch(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data);
  });
});

spells_router.post("/search", (req, res, next) => {
  spell.search(req.body).then(data => {
    res.status(200).type('json').json(data);
  });
});

// Test Route
// spells_router.get("/test/:spellID/:typeID", (req, res, next) => {
//   spell.getSpellDescriptions(req.params.spellID, req.params.typeID).then(data => {
//     res.status(200).type('json').json(data);
//   });
// });

// 2550 - Zevfeer's Theft of Vitae
spells_router.get("/:spellID", async (req, res, next) => {
  const data = await spell.select([], { id: req.params.spellID });
  res.status(200).type('json').json({
    "data": data,
    "recourse": data.RecourseLink > 0 ? (await spell.select([], { id: data.RecourseLink })) : null,
    "components": {
      "1": data.components1 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.components1 }) : null,
      "2": data.components2 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.components2 }) : null,
      "3": data.components3 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.components3 }) : null,
      "4": data.components4 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.components4 }) : null
    },
    "noexpendreagents": {
      "1": data.NoexpendReagent1 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.NoexpendReagent1 }) : null,
      "2": data.NoexpendReagent2 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.NoexpendReagent2 }) : null,
      "3": data.NoexpendReagent3 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.NoexpendReagent3 }) : null,
      "4": data.NoexpendReagent4 > 0 ? await item.select(["id", "name", "nodrop", "price"], { id: data.NoexpendReagent4 }) : null
    },
    "descriptions": await spell.getSpellDescriptions(req.params.spellID, data.typedescnum),
    "scrolls": await item.select(
      ["id", "name", "scrollname", "scrolltype", "scrolllevel", "scrolllevel2", "nodrop", "price"], 
      { scrolleffect: req.params.spellID }
    ),
    "procitems": await item.select(["id", "name", "procname", "proctype", "proclevel", "proclevel2"], { proceffect: req.params.spellID })
  });
});

module.exports = spells_router;