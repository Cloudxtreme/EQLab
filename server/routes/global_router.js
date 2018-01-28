'use strict';

const express       = require("express"),
      global_router = express.Router(),
      npc           = require("../models/npc.js"),
      item          = require("../models/item.js");
      

global_router.get("/variables", async (req, res, next) => {
  res.status(200).type('json').json({
    "dbName": process.env.DB_EQEMU_DATABASE,
    "useWebSockets": process.env.USE_WEBSOCKETS,
    "altCurrency": await item.getAltCurrencyList()
  })
});

module.exports = global_router;