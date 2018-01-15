'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js');

module.exports = {
  
  select: async (columnsArr = null, whereObj) => {
    return (await db.select('items', columnsArr, whereObj))[0];
  },

  update: async (id, values) => {
    if (id) {
      return await db.update('items', values, { id });
    }
  },

  getAltCurrencyList: async () => {
    let queryStr = `
    SELECT alternate_currency.id, items.id AS 'item_id', items.Name AS 'name'
    FROM alternate_currency
    LEFT JOIN items ON items.id = alternate_currency.item_id
    `;

    let SQLdata = await db.raw(queryStr);
    return sanitize(SQLdata[0]);
  },

  searchLootTables: async (searchTerm) => {
      let queryStr=`
      SELECT id, name
      FROM loottable
      WHERE id LIKE '${searchTerm}%'
      OR name LIKE '%${searchTerm}%'
      `
      
      let results = await db.raw(queryStr);
      return results[0];
    }

}