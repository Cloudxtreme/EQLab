'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js');


module.exports = {
  
  search: async (values) => {
    let queryStr=`
    SELECT * FROM spells_new
    WHERE (id LIKE '${values.id ? values.id : ''}%' OR name LIKE '%${values.id ? values.id : ''}%')
    `
    values.class ? queryStr += ` AND classes${values.class} BETWEEN ${values.minlevel ? values.minlevel : '0'} AND ${values.maxlevel ? values.maxlevel : '254'}` : null
    values.spell_category ? queryStr += ` AND spell_category='${values.spell_category}'` : null
    // values.deity ? queryStr += `` : null

    let results = await db.raw(queryStr);
    return results[0];
  },

  simpleSearch: async (searchTerm = null) => {
    if (!searchTerm) {
      return null;
    }
    let queryStr=`
    SELECT id, name FROM spells_new
    WHERE (id LIKE '${searchTerm}%' OR name LIKE '%${searchTerm}%')
    `

    let results = await db.raw(queryStr);
    return results[0];
  },

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
  },

  getScrollItems: async (spellID) => {
    let queryStr = `
    SELECT id, name, scrollname, scrolltype, scrolllevel, scrolllevel2, nodrop, price
    FROM items
    WHERE scrolleffect = '${spellID}'
    `;

    try {
      let SQLdata = await db.raw(queryStr);
      return SQLdata[0];
    } catch(error) {
      throw new Error('Error Retrieving Spell Scroll Items: ' + error);
    }
  }

}