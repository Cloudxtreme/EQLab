'use strict';

const global_router = require("express").Router(),
      npc           = require("../models/npc.js"),
      item          = require("../models/item.js");
      

global_router.get("/variables", async (req, res, next) => {
  res.status(200).type('json').json({
    "dbName": process.env.DB_EQEMU_DATABASE,
    "useWebSockets": process.env.USE_WEBSOCKETS,
    "useAutoFileIO": process.env.USE_AUTO_FILE_IO,
    "altCurrency": await item.getAltCurrencyList()
  })
});

module.exports = global_router;