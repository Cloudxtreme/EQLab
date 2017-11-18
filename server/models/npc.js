'use strict';

const db        = require('../db/db.js').db,
      Treeize   = require('treeize'),
      sanitize  = require('../lib/sanitize.js');

module.exports = {
  
  select: async (columnsArr = null, whereObj) => {
    return (await db.select('npc_types', columnsArr, whereObj))[0];
  },

  getFactions: async (npcID) => {
    let queryStr = `
    SELECT npc_types.npc_faction_id AS 'id', npc_faction.name, npc_faction.primaryfaction AS 'primaryfaction_id', 
    parentFaction.name AS 'primaryfaction_name', npc_faction.ignore_primary_assist, npc_faction_entries.value AS 'entries:value', 
    npc_faction_entries.npc_value AS 'entries:npc_value', npc_faction_entries.temp AS 'entries:temp', 
    faction_list.id AS 'entries:faction_id', faction_list.name AS 'entries:name'
    FROM npc_types
    LEFT JOIN npc_faction ON npc_types.npc_faction_id = npc_faction.id
    LEFT JOIN faction_list AS parentFaction ON npc_faction.primaryfaction = parentFaction.id
    LEFT JOIN npc_faction_entries ON npc_faction.id = npc_faction_entries.npc_faction_id
    LEFT JOIN faction_list ON npc_faction_entries.faction_id = faction_list.id
    WHERE npc_types.id = '${npcID}'
    `;

    let SQLdata = await db.raw(queryStr);
    let factions = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    factions = factions.grow(SQLdata[0]).getData();
    return factions[0];
  },

  getTints: async (npcID) => {
    let queryStr = `
    SELECT npc_types.armortint_id AS 'tint_set_id', npc_types_tint.tint_set_name, npc_types_tint.red1h, npc_types_tint.grn1h, 
    npc_types_tint.blu1h, npc_types_tint.red2c, npc_types_tint.grn2c, npc_types_tint.blu2c, npc_types_tint.red3a, npc_types_tint.grn3a, 
    npc_types_tint.blu3a, npc_types_tint.red4b, npc_types_tint.grn4b, npc_types_tint.blu4b,npc_types_tint.red5g, npc_types_tint.grn5g, 
    npc_types_tint.blu5g, npc_types_tint.red6l, npc_types_tint.grn6l, npc_types_tint.blu6l, npc_types_tint.red7f, npc_types_tint.grn7f,
    npc_types_tint.blu7f, npc_types_tint.red8x, npc_types_tint.grn8x, npc_types_tint.blu8x, npc_types_tint.red9x, npc_types_tint.grn9x, 
    npc_types_tint.blu9x
    FROM npc_types
    LEFT JOIN npc_types_tint ON npc_types_tint.id = npc_types.armortint_id
    WHERE npc_types.id = '${npcID}'
    `;

    let tints = await db.raw(queryStr);
    tints = sanitize(tints[0])
    return tints[0];
  },

  getEmotes: async (npcID) => {
    let queryStr = `
    SELECT npc_types.emoteid AS 'emoteid', npc_emotes.id AS 'entries:id', npc_emotes.event_ AS 'entries:event_', 
    npc_emotes.type AS 'entries:type', npc_emotes.text AS 'entries:text'
    FROM npc_types
    LEFT JOIN npc_emotes ON npc_emotes.emoteid = npc_types.emoteid
    WHERE npc_types.id = '${npcID}'
    `;

    let SQLdata = await db.raw(queryStr);
    let emotes = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    emotes = emotes.grow(SQLdata[0]).getData();
    return emotes[0];
  },

  getSpells: async (npcID) => {
    let queryStr = `
    SELECT npc_types.npc_spells_id AS 'id',  npc_spells.name AS 'name', npc_spells.parent_list,
    npc_spells.attack_proc, aproc.name AS 'proc_name', npc_spells.proc_chance, npc_spells.range_proc, 
    rproc.name AS 'rproc_name', npc_spells.rproc_chance, npc_spells.defensive_proc, dproc.name AS 'dproc_name', 
    npc_spells.dproc_chance, npc_spells_entries.id AS 'entries:id', npc_spells_entries.spellid AS 'entries:spell_id', 
    npc_spells_entries.type AS 'entries:type', npc_spells_entries.minlevel AS 'entries:minlevel', 
    npc_spells_entries.maxlevel AS 'entries:maxlevel', npc_spells_entries.recast_delay AS 'entries:recast_delay', 
    npc_spells_entries.priority AS 'entries:priority', npc_spells_entries.resist_adjust AS 'entries:resist_adjust', 
    spells_new.name AS 'entries:name'
    FROM npc_types
    LEFT JOIN npc_spells ON npc_types.npc_spells_id = npc_spells.id
    LEFT JOIN npc_spells_entries ON npc_spells.id = npc_spells_entries.npc_spells_id
    LEFT JOIN spells_new aproc ON npc_spells.attack_proc = aproc.id
    LEFT JOIN spells_new rproc ON npc_spells.range_proc = rproc.id
    LEFT JOIN spells_new dproc ON npc_spells.defensive_proc = dproc.id
    LEFT JOIN spells_new ON npc_spells_entries.spellid = spells_new.id
    WHERE npc_types.id = '${npcID}'
    `;



    let SQLdata = await db.raw(queryStr);
    let spells = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    spells = spells.grow(SQLdata[0]).getData()[0];

    queryStr = `
    SELECT npc_spells.id, npc_spells.name, npc_spells.attack_proc, aproc.name AS 'proc_name', npc_spells.proc_chance, 
    npc_spells.range_proc, rproc.name AS 'rproc_name', npc_spells.rproc_chance, npc_spells.defensive_proc, 
    dproc.name AS 'dproc_name', npc_spells.dproc_chance, npc_spells_entries.id AS 'entries:id',
    npc_spells_entries.spellid AS 'entries:spell_id', npc_spells_entries.type AS 'entries:type',
    npc_spells_entries.minlevel AS 'entries:minlevel', npc_spells_entries.maxlevel AS 'entries:maxlevel',
    npc_spells_entries.recast_delay AS 'entries:recast_delay', npc_spells_entries.priority AS 'entries:priority',
    npc_spells_entries.resist_adjust AS 'entries:resist_adjust', spells_new.name AS 'entries:name'
    FROM npc_spells
    LEFT JOIN npc_spells_entries ON npc_spells.id = npc_spells_entries.npc_spells_id
    LEFT JOIN spells_new aproc ON npc_spells.attack_proc = aproc.id
    LEFT JOIN spells_new rproc ON npc_spells.range_proc = rproc.id
    LEFT JOIN spells_new dproc ON npc_spells.defensive_proc = dproc.id
    LEFT JOIN spells_new ON npc_spells_entries.spellid = spells_new.id
    WHERE npc_spells.id = '${spells.parent_list}'
    `;

    SQLdata = await db.raw(queryStr);
    let parentList = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    spells.parent_list = parentList.grow(SQLdata[0]).getData()[0];
    return spells;
  },

  getEffects: async (npcID) => {
    let queryStr = `
    SELECT npc_types.npc_spells_effects_id AS 'id',  npc_spells_effects.name AS 'name', npc_spells_effects.parent_list, 
    npc_spells_effects_entries.id AS 'entries:id',npc_spells_effects_entries.spell_effect_id AS 'entries:spell_effect_id', 
    npc_spells_effects_entries.minlevel AS 'entries:minlevel', npc_spells_effects_entries.maxlevel AS 'entries:maxlevel', 
    npc_spells_effects_entries.se_base AS 'entries:se_base', npc_spells_effects_entries.se_limit AS 'entries:se_limit', 
    npc_spells_effects_entries.se_max AS 'entries:se_max'
    FROM npc_types
    LEFT JOIN npc_spells_effects ON npc_types.npc_spells_effects_id = npc_spells_effects.id
    LEFT JOIN npc_spells_effects_entries ON npc_spells_effects.id = npc_spells_effects_entries.npc_spells_effects_id
    WHERE npc_types.id = '${npcID}'
    `;

    let SQLdata = await db.raw(queryStr);
    let effects = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    effects = effects.grow(SQLdata[0]).getData();
  
    queryStr = `
    SELECT npc_spells_effects.id, npc_spells_effects.name, npc_spells_effects_entries.id AS 'effectentries:id',
    npc_spells_effects_entries.spell_effect_id AS 'effectentries:spell_effect_id', 
    npc_spells_effects_entries.minlevel AS 'effectentries:minlevel', npc_spells_effects_entries.maxlevel AS 'effectentries:maxlevel', 
    npc_spells_effects_entries.se_base AS 'effectentries:se_base', npc_spells_effects_entries.se_limit AS 'effectentries:se_limit',
    npc_spells_effects_entries.se_max AS 'effectentries:se_max'
    FROM npc_spells_effects
    LEFT JOIN npc_spells_effects_entries ON npc_spells_effects.id = npc_spells_effects_entries.npc_spells_effects_id
    WHERE npc_spells_effects.id = '${effects[0].parent_list}'
    `;

    SQLdata = await db.raw(queryStr);
    let parentList = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    effects[0].parent_list = parentList.grow(SQLdata[0]).getData()[0];
    return effects[0];
  },
  
  getLootTableTree: async (npcID) => {
    let queryStr = `
    SELECT npc_types.loottable_id AS 'id', loottable.name AS 'name', loottable_entries.lootdrop_id AS 'lootdrops:id',
    lootdrop.name AS 'lootdrops:name', lootdrop_entries.item_id AS 'lootdrops:items:id', items.Name AS 'lootdrops:items:name'
    FROM npc_types
    LEFT JOIN loottable ON npc_types.loottable_id = loottable.id
    LEFT JOIN loottable_entries ON loottable.id = loottable_entries.loottable_id
    LEFT JOIN lootdrop ON loottable_entries.lootdrop_id = lootdrop.id
    LEFT JOIN lootdrop_entries ON lootdrop.id = lootdrop_entries.lootdrop_id
    LEFT JOIN items ON lootdrop_entries.item_id = items.id
    WHERE npc_types.id = '${npcID}'
    `;

    let SQLdata = await db.raw(queryStr);
    let lootTree  = new Treeize();
    SQLdata[0] = sanitize(SQLdata[0]);
    lootTree = lootTree.grow(SQLdata[0]).getData()[0]
    return lootTree;
  },

  getMerchantTable: async (npcID) => {
    let queryStr = `
    SELECT npc_types.merchant_id AS 'id', merchantlist.slot AS 'items:slot', merchantlist.item AS 'items:id', 
    items.Name AS 'items:name', merchantlist.faction_required AS 'items:faction_required', 
    merchantlist.level_required AS 'items:level_required', merchantlist.alt_currency_cost AS 'items:alt_currency_cost', 
    merchantlist.classes_required AS 'items:classes_required', merchantlist.probability AS 'items:probability'
    FROM npc_types
    LEFT JOIN merchantlist ON merchantlist.merchantid = npc_types.merchant_id
    LEFT JOIN items ON items.id = merchantlist.item
    WHERE npc_types.id = '${npcID}'
    `;
    let SQLdata = await db.raw(queryStr);
 
    let merchantTable = new Treeize;
    SQLdata[0] = sanitize(SQLdata[0]);
    merchantTable = merchantTable.grow(SQLdata[0]).getData();
    return merchantTable[0];
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

  getTintList: async () => {
    return await db.select('npc_types_tint', ['id', 'tint_set_name'], {});
  },

  getRaceList: async () => {
    return await db.select('races', ['id', 'name'], {});
  },

  getNPCFactionList: async () => {
    return await db.select('npc_faction', ['id', 'name'], {});
  },

  getNPCSpellList: async () => {
    return await db.select('npc_spells', ['id', 'name'], {});
  },

  getNPCPassiveList: async () => {
    return await db.select('npc_spells_effects', ['id', 'name'], {});
  },

  searchNPCs: async (searchTerm) => {
    let queryStr=`
    SELECT id, name
    FROM npc_types
    WHERE id LIKE '${searchTerm}%'
    OR name LIKE '%${searchTerm}%'
    `
    
    let results = await db.raw(queryStr);
    return results[0];
  },

  searchNPCSpells: async (searchTerm) => {
    let queryStr=`
    SELECT id, name
    FROM npc_spells
    WHERE id LIKE '${searchTerm}%'
    OR name LIKE '%${searchTerm}%'
    `
    
    let results = await db.raw(queryStr);
    return results[0];
  }

}