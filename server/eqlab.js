'use strict';

const app         = require('./app'),
      server      = require('http').Server(app),
      debug       = require('debug')('eqlab'),
      io          = require('./io').initialize(server),
      nodeCleanup = require('node-cleanup'),
      knex        = require('./db/db.js').knex,
      sqlEvent    = require('./db/db.js').sqlEvent,
      auth_db     = require('./auth/auth.js').auth_db;


const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

// For nginx/Apache Reverse Proxy
if (process.env.USE_REVERSE_PROXY === 'TRUE') {
  app.enable('trust proxy');
}

// Start Express Server
server.listen(PORT, 'localhost', () => {
  console.log("EQLab: Launching Server, listening on PORT " + PORT);

  // Cleanup on Process Exit
  nodeCleanup((exitCode, signal) => {
    if (signal) {
      console.log('EQLab: Cleaning Up Before Process Exit')
      knex.destroy(() => {
        sqlEvent.stop();
        if (process.env.USE_AUTHENTICATION === 'TRUE') {
          auth_db.close();
        }
        process.kill(process.pid, signal); // Calling process.exit() won't inform parent process of signal
      });
      nodeCleanup.uninstall(); // Don't Call Cleanup Handler Again 
      return false;
    }
  });
});
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


// Event listener for HTTP server "error" event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}