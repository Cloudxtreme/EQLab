'use strict';

const files_router = require("express").Router(),
      jsonParser   = require('body-parser').json(),
      sanitizer    = require('express-sanitize-escape').middleware(),
      fs           = require('fs-extra'),
      path         = require('path'),
      EQLabFiles   = require(__basedir + "/models/EQLabFiles.js"),
      file         = new EQLabFiles(),
      fileDir      = path.resolve(__basedir + '/../files');


/*****************************************************************/

files_router.get("/spells_us.txt", (req, res, next) => {
  file.createSpellsTxt(path.resolve(fileDir + '/spells.us.txt'))
    .then(() => {
      res.status(200).type('text/plain').download(path.resolve(fileDir + '/spells.us.txt'), 'spells_us.txt');
    })
    .catch(error => { next(); });
});

files_router.get("/dbstr_us.txt", (req, res, next) => {
  fs.access(path.resolve(fileDir + '/dbstr_us.txt'), err => {
    if (err) next();
    res.status(200).type('text/plain').download(path.resolve(fileDir + '/dbstr_us.txt'), 'dbstr_us.txt');
  })   
});

files_router.get("/build", (req, res, next) => {
  file.createBuild('1.0')
    .then((newFile) => {
      res.status(200).type('application/zip').download(newFile);
    })
    .catch(error => { next(); });
});

files_router.get("/models/:zoneName", (req, res, next) => {
  file.addModelToZone(req.params.zoneName, 'TEST,TEST')
    .then(data => {
      res.status(200).type('json').json({ status: 'ok' });
    })
    .catch(error => { next(); });
});

module.exports = files_router;