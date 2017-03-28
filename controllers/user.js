// imports

passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

User = require(__dirname + '/../models/user').User;

const category = require(__dirname + '/../utils/categoryCreator');



// functions


// login user
exports.loginUser = function(req, res, next) {
    if(!req.user){
        passport.authenticate('local', function(err, user) {
            res.json({ error: err, user: user });
        })(req, res, next);
    }else{
        res.json({status: true, error: false, user: req.user});
    }
}

// register user

exports.registerUser = function(req, res, next) {
    if(req.user){
        res.redirect('/');
    }else{
        User.findOne({username : req.query.username }, function(err, registered) {
          if(registered) {
            res.json(registered);
          } else {
            User.create(req.query.username, req.query.password, function(err, user) {
              if(!err) {
                category.init(user);
              }
            });
          }
        });// end of findOne
    }
}

exports.listUsers = function(req, res, next) {
  User.find(function(err, searchResult) {
    res.json(searchResult);
  });
}

// passport functions

// User login and password check in database
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.authorize(username, password, function(err, user) {
            if(err) {return done(null, false)}
            else{return done(null, user)}
        });
    }
));

// User session
passport.serializeUser(function(user, done) {
   done(null, user);
});

// User delete session
passport.deserializeUser(function(username, done) {
   done(null, {username: username});
});
