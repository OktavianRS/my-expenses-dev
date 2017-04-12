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
    }
    else if(!user) {
      return res.json({ user });
    }
    else {
      req.logIn(user, function(err) {
        if (err) { return res.json(err); }
        return res.json({ user });
      });
    }
  })(req, res, next);
};

exports.logoutUser = function(req, res, next) {
  if (req.user) {
    req.logout();
    res.json({ done: true });
  } else {
      res.json({ done: false });
  }
};

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
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({ user });
          });
        }
      });
    }
  });// end of findOne
}

exports.getUserInfo = function(req, res, next) {
  if (req.user) {
    console.log(req.user);
    res.json({ user: req.user });
  } else {
    res.json({ user: false });
  }
}

exports.listUsers = function(req, res, next) {
  User.find(function(err, searchResult) {
    res.json(searchResult);
  });
}
