'use strict';

const express     = require("express"),
      item_router = express.Router(),
      item        = require("../models/item.js");


item_router.get("/loottable/options/search/:searchTerm", (req, res, next) => {
  item.searchLootTableOptions(req.params.searchTerm).then(data => {
    res.status(200).type('json').json(data)
  });
});

item_router.get("/altcurrencylist", (req, res, next) => {
  item.getAltCurrencyList().then(data => {
    res.status(200).type('json').json(data)
  })
});

module.exports = item_router;