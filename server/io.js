const sio      = require('socket.io'),
      sqlEvent = require('./db/db.js').sqlEvent,
      zone     = require("./models/zone.js"),
      dbName   = process.env.DB_EQEMU_DATABASE;


// Socket.io
exports.initialize = server => {
  const io = sio(server, {
    serveClient: false
  });

  // MySQL Event Triggers
  const onNewSpawn2 = sqlEvent.add(`${dbName}.spawn2`, async (oldRow, newRow, event) => {
    if (oldRow === null) { 
      let spawn2 = await zone.getSingleSpawn2Tree(newRow.fields.id);
      if (io.sockets.adapter.rooms['ZoneApp'].length) {
        io.to('ZoneApp').emit('spawn2insert', spawn2);
      }
    }
  });

  // App
  io.on('connection', socket => {
    console.log('socket.io: User Connected');
    
    // ZoneApp
    socket.on('ZoneApp Loaded', () => {
      socket.join('ZoneApp');
      console.log('socket.io: User Loaded ZoneApp');

      socket.on('ZoneApp Unloaded', () => {
        socket.leave('ZoneApp');
        console.log('socket.io: User Unloaded ZoneApp');  
      });
    });

    
    socket.on('disconnect', data => {
      console.log('socket.io: User Disconnected');
    });
  });
};