'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js');

module.exports = {
  
  select: async (columnsArr = null, whereObj) => {
    return (await db.select('spells_new', columnsArr, whereObj))[0];
  },

  update: async (id, values) => {
    if (id) {
      return await db.update('spells_new', values, { id });
    }
  },

  delete: async (id) => {
    if (id) {
      return await db.delete('spells_new', { id });
    }
  }

}