'use strict';

const files_router = require("express").Router(),
      jsonParser   = require('body-parser').json(),
      sanitizer    = require('express-sanitize-escape').middleware(),
      fs           = require('fs-extra'),
      path         = require('path'),
      EQLabFiles   = require(__serverRoot + '/models/EQLabFiles.js'),
      file         = new EQLabFiles();


/*****************************************************************/

files_router.get("/spells_us.txt", (req, res, next) => {
  file.createSpellsTxt()
    .then(() => {
      res.status(200).type('text/plain').download(__filesdir + '/spells.us.txt', 'spells_us.txt');
    })
    .catch(error => { next(); });
});

files_router.get("/dbstr_us.txt", (req, res, next) => {
  fs.access(__filesdir + '/dbstr_us.txt', err => {
    if (err) next();
    res.status(200).type('text/plain').download(__filesdir + '/dbstr_us.txt', 'dbstr_us.txt');
  })   
});

files_router.get("/build", (req, res, next) => {
  file.createBuild(req.body.version)
    .then(file => {
      res.status(200).type('application/zip').download(file);
    })
    .catch(error => { next(); });
});

files_router.post("/addmodels/all/", jsonParser, sanitizer, (req, res, next) => {
  file.addModelToAllZones(req.body)
    .then(data => {
      res.status(200).type('json').json({ status: 'ok' });
    })
    .catch(error => { next(); });
});

files_router.post("/addmodel", jsonParser, sanitizer, (req, res, next) => {
  file.addModelToZone(req.params.zoneName, req.body)
    .then(data => {
      res.status(200).type('json').json({ status: 'ok' });
    })
    .catch(error => { next(); });
});

module.exports = files_router;