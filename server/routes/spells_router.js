'use strict';

const express      = require("express"),
      spell_router = express.Router(),
      spell        = require("../models/spell.js");


//
spell_router.get("/:spellID", (req, res, next) => {
  spell.select(req.params.spellID).then(data => {
    res.status(200).type('json').json(data)
  })
});

module.exports = spell_router;