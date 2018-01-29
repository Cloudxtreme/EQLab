'use strict';

const item_router = require("express").Router(),
      jsonParser  = require('body-parser').json(),
      sanitizer   = require('express-sanitize-escape').middleware(),
      item        = require("../models/item.js");


item_router.get("/loottable/options/search/:searchTerm", (req, res, next) => {
  item.searchLootTableOptions(req.params.searchTerm)
    .then(data => {
      res.status(200).type('json').json(data)
    })
    .catch(error => { next(); });
});

item_router.get("/altcurrencylist", (req, res, next) => {
  item.getAltCurrencyList()
    .then(data => {
      res.status(200).type('json').json(data)
    })
    .catch(error => { next(); });
});

module.exports = item_router;