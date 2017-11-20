'use strict';

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  pool: {min: 0, max: 1}
});

// MySQL Event Watcher
const sqlEvent = require('mysql-events')({
  connectionLimit : 1,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}, {
  includeEvents: ['tablemap', 'writerows']
});

const db = {

  select: (tableStr, columnsArr, whereObj) => {
    return new Promise((resolve, reject) => {
      knex
        .select(columnsArr)
        .from(tableStr)
        .where(whereObj)
        .then(SQLdata => resolve(SQLdata))
        .catch(error => reject(error))
    });
  },

  insert: (tableStr, insertArr) => {
    return new Promise((resolve, reject) => {
      knex
        .insert(insertArr)
        .into(tableStr)
        .then(SQLdata => {
          resolve(SQLdata);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update: (tableStr, updateObj, whereObj) => {
    return new Promise((resolve, reject) => {
      knex(tableStr)
        .update(updateObj)
        .where(whereObj)
        .then(SQLdata => {
          resolve(SQLdata);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete: (tableStr, whereObj) => {
    return new Promise((resolve, reject) => {
      knex(tableStr)
        .del()
        .where(whereObj)
        .then(SQLdata => {
          resolve(SQLdata)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
  raw: queryStr => {
    return new Promise((resolve, reject) => {
      knex.raw(queryStr)
        .then(SQLdata => {
          resolve(SQLdata);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
  
module.exports = { 
  knex,
  db, 
  sqlEvent 
};