'use strict';

require('dotenv').config();

const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      sanitizer   = require('express-sanitize-escape'),
      exphbs      = require('express-handlebars'),
      logger      = require('morgan'),
      // path        = require('path'),
      api_router  = require('./routes');


// Logger
if (process.env.NODE_ENV === 'production') {
  app.use(logger('short'));
} else {
  app.use(logger('dev'));
}

// View Engine
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('view cache', false);

// Body Parser and Sanitizer
app.use(bodyParser.json());
app.use(sanitizer.middleware());

// Authentication
if (process.env.USE_AUTHENTICATION === 'TRUE') {
  const auth_db     = require('./auth/auth.js').auth_db,
        User        = require('./auth/auth.js').User,
        passport    = require('passport'),
        JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt  = require('passport-jwt').ExtractJwt,
        jwt         = require('jsonwebtoken'),
        flash       = require('connect-flash'),
        auth_router = require('./auth/auth_router').auth_router;

  console.log('EQLab: Using Authentication');

  // Sync Authentication Database
  auth_db.sync().then(() => { 
    console.log("EQLab: Authentication Database Connection Successful");
  }).catch(err => {
    console.error(err, "EQLab: Authentication Database Connection Failed");
  });

  // Passport Middleware (JSON Web Tokens)
  app.use(passport.initialize());
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

  // Flash Messages
  app.use(flash());

  // Authentication Routes
  app.use('/eqlab/api/auth', auth_router);
}

// API Routes
app.use('/eqlab/api', api_router);

// Serve API Homepage in Development
if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res, next) => {
    res.render('eqlab', {title: 'EQLab API Server'});
  });
}

// Serve React Client in Production if Not Using Reverse Proxy from nginx/Apache
if (process.env.NODE_ENV === 'production' && process.env.USE_REVERSE_PROXY === 'FALSE') {
  app.use(express.static('../client/build'));
  app.get('/*', (req, res, next) => {
    res.sendFile('../client/build/index.html');
  });
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