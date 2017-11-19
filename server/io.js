const sio      = require('socket.io'),
      sqlEvent = require('./db/db.js').sqlEvent,
      zone     = require("./models/zone.js"),
      dbName   = process.env.DB_DATABASE;

exports.initialize = server => {
  const io = sio(server, {
    serveClient: false
  });

  // App
  io.on('connection', socket => {
    console.log('socket.io: User Connected');
    
    // ZoneApp
    socket.on('ZoneApp Loaded', () => {
      const room = 'ZoneApp';
      socket.join(room);
      console.log('socket.io: User Loaded ZoneApp');

      if (io.sockets.adapter.rooms[room].length) {
        const onNewSpawn2 = sqlEvent.add(`${dbName}.spawn2`, async (oldRow, newRow, event) => {
          if (oldRow === null) { 
            let spawn2 = await zone.getSingleSpawn2Tree(newRow.fields.id)
            io.to(room).emit('spawn2insert', spawn2);
          }
        });  
      }

      socket.on('ZoneApp Unloaded', () => {
        socket.leave(room);
        console.log('socket.io: User Unloaded ZoneApp');  
      });
    });

    
    socket.on('disconnect', data => {
      console.log('socket.io: User Disconnected');
    });
  });
};