npc_router.get("/npc/:npcID/spells", function (req, res, next) {
  async.waterfall([
    async.constant(req.params.npcID),
    npc.getSpellSet,
    npc.getParentList
  ], function (err, data) {
    res.status(200).type('json').json(data);
  });
});