'use strict';

const express     = require("express"),
      item_router = express.Router();
      // item        = require("../models/item.js");

item_router.get("/item", function (req, res, next) {
  res.status(200).type('html').render('item', {
    title: 'Items'
  });
});

module.exports = item_router;