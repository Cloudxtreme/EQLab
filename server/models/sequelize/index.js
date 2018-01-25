'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var eqlab_db  = {};

// EQLab Database
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_EQLAB_DATABASE,
  dialect: "mysql",
  logging: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    eqlab_db[model.name] = model;
  });

Object.keys(eqlab_db).forEach(modelName => {
  if (eqlab_db[modelName].associate) {
    eqlab_db[modelName].associate(eqlab_db);
  }
});

eqlab_db.sequelize = sequelize;
eqlab_db.Sequelize = Sequelize;

module.exports = eqlab_db;