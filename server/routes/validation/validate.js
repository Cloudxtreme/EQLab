const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const spawn2Fields = require('./spawn2Fields.js');
const spawngroupFields = require('./spawngroupFields.js');
const npc_typeFields = require('./npc_typeFields.js');


module.exports = {

  spawn2: [
    body(spawn2Fields.filter(field => field.type.includes('int')).map(field => field.field), "Must be an integer").optional().isInt(),
    body(spawn2Fields.filter(field => field.type.includes('float')).map(field => field.field), "Must be a float").optional().isFloat()
  ],

  spawngroup: [
    body(spawngroupFields.filter(field => field.type.includes('int')).map(field => field.field), "Must be an integer").optional().isInt(),
    body(spawngroupFields.filter(field => field.type.includes('float')).map(field => field.field), "Must be a float").optional().isFloat()
  ],

  npc_type: [
    body(npc_typeFields.filter(field => field.type.includes('int')).map(field => field.field), "Must be an integer").optional().isInt(),
    body(npc_typeFields.filter(field => field.type.includes('float')).map(field => field.field), "Must be a float").optional().isFloat()
  ],

  spell: [
    
  ]

}