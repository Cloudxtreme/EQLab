'use strict';

require('dotenv').config();

const express        = require('express'),
      app            = express(),
      exphbs         = require('express-handlebars'),
      logger         = require('morgan'),
      Sequelize      = require('sequelize'),
      auth_db        = require('./auth/auth.js').auth_db,
      User           = require('./auth/auth.js').User,
      passport       = require('passport'),
      JwtStrategy    = require('passport-jwt').Strategy,
      ExtractJwt     = require('passport-jwt').ExtractJwt,
      jwt            = require('jsonwebtoken'),
      flash          = require('connect-flash'),
      path           = require('path'),
      apiRoutes      = require('./routes'),
      authRoutes     = require('./auth/auth_router').auth_router;
   
// Logger
if (process.env.NODE_ENV === 'production') {
  app.use(logger('short'));
} else {
  app.use(logger('dev'));
}

// View Engine for Development
if (process.env.NODE_ENV === 'development') {
  app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
  app.set('view engine', 'hbs');
  app.set('view cache', false);
  app.get('/', (req, res, next) => {
    res.render('eqlab', {title: 'EQLab API Server'});
  });
}

// Serve React Client in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  }); 
}

// API Routes
app.use('/api', apiRoutes);

// Authentication
if (process.env.USE_AUTH === 'TRUE') {
  console.log('EQLab: Using Authentication')
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.use(new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    issuer: process.env.JWT_ISSUER
  }, function(jwt_payload, next) {
    User.findByUsername(jwt_payload.user.username, (err, user) => {
      if (user) {
        next(null, {
          username: user.username,
          status: user.status
        });
      } else {
        next(null, false);
      }
    });
  }));

  // Sync Authentication Database
  auth_db.sync().then(() => { 
    console.log("EQLab: Authentication Database Connection Successful");
  }).catch(err => {
    console.error(err, "EQLab: Authentication Database Connection Failed");
  });
  
  // Flash Messages
  app.use(flash());

  // Authentication Routes
  app.use('/api', authRoutes);
}

// Catch 404 Errors
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle Errors
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    title: err.status,
    errorstatus: err.status,
    errormessage: err.message
  });
});

module.exports = app;