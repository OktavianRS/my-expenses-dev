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
   done(null, user); 
});

// может работать не правильно user - username
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
app.get('/', function(req, res) {
    if(!req.cookies.disablepreloaderforapp) {
        res.redirect('/welcome');
    } else {
        res.redirect('/login');
    }
});
app.get('/welcome', routes.loader);
app.get('/login', routes.login);
app.get('/registration', routes.registration);
app.get('/registration-failed', routes.registrationFail);

app.use(function(req, res) {
   res.send("Page Not Found Sorry"); 
});

app.get('/user_not_found', routes.loginUndef);

app.get('/user', function(req, res, next) {
    if(req.user) {
        res.render('user', {
            username: req.user.username.username
        });
    }else {
        res.redirect('/');
    }
});

app.use(function(err, req, res, next) {
   if (app.get('env') == 'development') {
       var errorHandler = express.errorHandler();
       errorHandlerr(err, req, res, next);
   } else {
       res.send(500);
   }
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', { 
        successRedirect: '/user',
        failureRedirect: '/user_not_found'
    })(req, res,next);
});

app.post('/registration', function(req, res, next) {
    User.findOne({username : req.body.username }, function(err, result) {
        if(err) {
            next(err);
        }
        if(result) {
            res.redirect('/registration-failed');
        }
        else {
            User.create(req.body.username, req.body.password, function(err, user) {
                if (err) {
                    res.send(500, 'Error registering user');
                } else {
                    req.login(user, function(err) {
                        if (err) { return next(err); }
                        return res.redirect('/user');
                    });
                }
            });//end of create
        }// end of else
    });// end of findOne
});

app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
