'use strict';

const auth_router     = require("express").Router(),
      User            = require('./auth.js').User,
      bodyParser      = require('body-parser'),
      urlParser       = bodyParser.urlencoded({ extended: true }),
      jsonParser      = bodyParser.json(),
      fecha           = require('fecha');


const isAuth = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

auth_router.post('/auth/register', urlParser, jsonParser, (req, res, next) => {
  console.log("Registering New User: " + req.body.username);
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    last_login: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    status: req.body.status,
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      req.login(user, err => {
        console.log("User Logged In: " + req.body.username);
        res.redirect('/eqlab');
      });
    }
  });
});

auth_router.post('/auth/login', urlParser, jsonParser, (req, res, next) => {
  User.authenticate()(req.body.username, req.body.password, (err, user, authError) => {
    if (err) return next(err);
    if (user === false) {
      console.log(authError.message)
    } else {
      req.login(user, err => {
        console.log("User Logged In: " + req.body.username);
        res.redirect('/eqlab');
      });
    }
  });
});

auth_router.get('/auth/logout', (req, res, next) => {
  console.log("User Logged Out: " + req.user);
  req.logOut();
  req.session = null;
  res.redirect('/');
});

auth_router.get('/register', (req, res, next) => {
  res.render('register');
})

module.exports = { 
  auth_router, 
  isAuth
}