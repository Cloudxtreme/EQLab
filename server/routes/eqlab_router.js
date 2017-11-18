'use strict';

const eqlab_router    = require("express").Router(),
      path            = require('path'),
      bodyParser      = require('body-parser'),
      urlParser       = bodyParser.urlencoded({ extended: true }),
      jsonParser      = bodyParser.json(),
      isAuth          = require('../auth/auth_router').isAuth,
      EQLab           = path.join(__dirname + '/../client/build/index.html');

eqlab_router.get('/', isAuth, (req, res, next) => {
  res.sendFile(EQLab);
});

module.exports = eqlab_router;