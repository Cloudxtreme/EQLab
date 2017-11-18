'use strict';

const express = require('express');
const api_router = express.Router();


api_router.use('/zone', require('./zone_router'));
// api_router.use('/class', require('./class_router'));
// api_router.use('/item', require('./item_router'));
// api_router.use('/spell', require('./spell_router'));
api_router.use('/npc', require('./npc_router'));
// api_router.use('/rules', require('./rules_router'));

module.exports = api_router;