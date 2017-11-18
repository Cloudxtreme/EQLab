'use strict';

const Sequelize              = require('sequelize'),
      passportLocalSequelize = require('passport-local-sequelize');

const auth_db = new Sequelize({
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_AUTH_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": "mysql"
});

const User = auth_db.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('user', 'dev', 'admin'),
    defaultValue: 'user'
  },
  username: {
    type: Sequelize.STRING(32),
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  hash: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_login: {
    type: Sequelize.DATE
  }
});

passportLocalSequelize.attachToUser(User, {
	usernameField: 'username'
});

module.exports = { 
  auth_db, 
  User 
};