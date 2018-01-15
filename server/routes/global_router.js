'use strict';

const express       = require("express"),
      global_router = express.Router(),
      npc           = require("../models/npc.js"),
      item          = require("../models/item.js");
      



global_router.get("/variables", async (req, res, next) => {
  res.status(200).type('json').json({
    "altCurrency": await item.getAltCurrencyList()
  })
});

module.exports = global_router;