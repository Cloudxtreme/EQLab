'use strict';

const express     = require("express"),
      item_router = express.Router(),
      item        = require("../models/item.js");


item_router.get("/loottable/search/:searchTerm", (req, res, next) => {
  item.searchLootTables(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});     

module.exports = item_router;