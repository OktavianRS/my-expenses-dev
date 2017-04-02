// imports

User = require(__dirname + '/../models/user').User;
const passport = require('passport');

const category = require(__dirname + '/../utils/categoryCreator');

// functions


// login user
exports.loginUser = function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) {
      res.json({ err });
    } else {
      res.json({ user });
    }
  })(req, res, next);
}

exports.isLogged = function(req, res, next) {
  req.user ? res.json({ logged: true }) : res.json({ logged: false });
}

// register user

exports.registerUser = function(req, res, next) {
  User.findOne({username : req.body.username }, function(err, registered) {
    if(registered) {
      res.json({ status: 'registered' });
    } else {
      User.create(req.body.username, req.body.password, function(err, user) {
        if(!err) {
          category.init(user);
          res.json({ user })
        }
      });
    }
  });// end of findOne
}

exports.listUsers = function(req, res, next) {
  User.find(function(err, searchResult) {
    res.json(searchResult);
  });
}
