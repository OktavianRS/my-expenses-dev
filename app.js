/**
 * Module dependencies.
 */
var express = require('express')
      ,routes = require('./routes')
      ,app = module.exports = express.createServer()
      ,passport = require('passport')
      ,LocalStrategy = require('passport-local').Strategy
      ,User = require(__dirname + '/models/user').User;
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'i dont know'}))
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Setup for auth
passport.serializeUser(function(user, done) {
   done(null, user.username); 
});

passport.deserializeUser(function(username, done) {
   done(null, {username: username}); 
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.authorize(username, password, function(err, user) {
            if(err) {return done(null, false)}
            else{return done(null, user)}
        });
    }
));

// Routes
app.get('/', function (req, res) { res.redirect('/login') });
app.get('/home', routes.home)
app.get('/login', routes.login);
app.get('/registration', routes.registration);
app.use(function(req, res) {
   res.send("Page Not Found Sorry"); 
});

app.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
       if (err) return next(err);
        res.json(users);
    });
});

app.get('/users/:id', function(req, res, next) {
   User.findById(req.params.id, function(err, user){
       if (!user) {
           res.send(404, "User not found");
           next();
       }
       if (err) return next(err);
        res.json(user);
   }) 
});

app.use(function(err, req, res, next) {
   if (app.get('env') == 'development') {
       var errorHandler = express.errorHandler();
       errorHandlerr(err, req, res, next);
   } else {
       res.send(500);
   }
});



app.post('/login', passport.authenticate('local', { successRedirect: '/users',
    failureRedirect: '/login' }));


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
