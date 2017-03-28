/**
 * Module dependencies.
 */
var express = require('express')
      ,app = module.exports = express.createServer()
      ,passport = require('passport')
      ,LocalStrategy = require('passport-local').Strategy
      ,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
      ,User = require(__dirname + '/models/user').User
      ,googleUser = require(__dirname + '/models/user').googleUser
      ,Category = require(__dirname + '/models/categories').Category
      ,subCategory = require(__dirname + '/models/subCategories').subCategory
      ,itemCategory = require(__dirname + '/models/itemCategories').itemCategory
      ,Expense = require(__dirname + '/models/expense').Expense
      ,config =require(__dirname + '/configs/config');

// import controllers
const userController = require('./controllers/user');

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

// Dev and prod config's
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
}, function(accessToken, refreshToken, profile, done) {
        googleUser.authorizeGoogle(profile.id, accessToken, profile.emails[0].value, profile.displayName, function(err, user) {
            if(err) {return done(null, false)}
            else{ console.log(user); return done(null, user)}
        });
    }
));

//===============================
//    Routes
//===============================

    //===============================
    //    Auth routes
    //===============================
    app.post('/login', userController.loginUser);

    app.post('/registration', userController.registerUser);

    app.get('/list-users', userController.listUsers);

    app.get('/auth/logout', function(req, res) {
        if(req.user){
            req.logout();
            res.redirect('/');
        }else {
            res.redirect('/');
        }
    });

//===============================
//    End of auth routes
//===============================

// When go / redirect to welcom if cookie was not found else redirect to login page
app.get('/', function(req, res) {
    if(!req.cookies.disablepreloaderforapp) {
        res.redirect('/welcome');
    } else {
        res.redirect('/login');
    }
});

app.get('/new-expenses', function(req, res, next) {
    if(req.user) {
        res.render('newExpenses');
    }else{
        res.redirect('/user');
    }
});

app.use(function(req, res) {
   res.send("Page Not Found Sorry");
});

    //===============================
    //    Get categories
    //===============================

    app.get('/get_category', function(req, res, next) {
        Category.find({user_id : req.user.username._id}, function(err, result) {
            res.json(result);
        }) ;
    });

    app.get('/get_sub_category', function(req, res, next) {
        subCategory.find({user_id : req.user.username._id}, function(err, result) {
            res.json(result);
        }) ;
    });

    app.get('/get_item_category', function(req, res, next) {
        itemCategory.find({user_id : req.user.username._id}, function(err, result) {
            res.json(result);
        }) ;
    });

    //===============================
    //    End of get categories
    //===============================

app.post('/new_category/:name', function(req, res, next) {
    if(req.user){
        Category.createCategory(req.user.username._id, req.params.name, function(err, result) {
            if(err) {
                if(err.code === 11000) {
                    res.json({error: 'Category already exist.'});
                }else{
                    next(err);
                }
            }
            else {
                Category.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
                }) ;
            }
        });
    }else{
        res.redirect('/');
    }
});

app.post('/new_sub_category/:name/:category_id', function(req, res, next) {
    if(req.user){
        subCategory.createSubCategory(req.user.username._id, req.params.category_id, req.params.name, function(err, result) {
            if(err) {
                if(err.code === 11000) {
                    res.json({error: 'Sub category already exist.'});
                }else{
                    next(err);
                }
            }
            else {
                subCategory.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
                }) ;
            }
        });
    }else{
        res.redirect('/');
    }
});

app.post('/new_item_category/:name/:category_id/:sub_category_id', function(req, res, next) {
    if(req.user){
        itemCategory.createItemCategory(req.user.username._id, req.params.category_id, req.params.sub_category_id, req.params.name, function(err, result) {
            if(err) {
                if(err.code === 11000) {
                    res.json({error: 'Sub category already exist.'});
                }else{
                    next(err);
                }
            }
            else {
                itemCategory.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
                });
            }
        });
    }else{
        res.redirect('/');
    }
});

app.delete('/category/:id', function(req, res) {
   Category.findOneAndRemove({
       _id: req.params.id
   }, function(err, catetgory) {
       if(err) {
           res.json({status: 'Ops... Error'});
       } else {
           Category.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
                }) ;
       }
   })
});

app.delete('/sub_category/:id', function(req, res) {
   subCategory.findOneAndRemove({
       _id: req.params.id
   }, function(err, subCat) {
       if(err) {
           res.json({status: 'Ops... Error'});
       }else {
           subCategory.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
            });
       }
   })
});

app.delete('/item_category/:id', function(req, res) {
   itemCategory.findOneAndRemove({
       _id: req.params.id
   }, function(err, itemCat) {
       if(err) {
           res.json({status: 'Ops... Error'});
       } else {
           itemCategory.find({user_id : req.user.username._id}, function(err, result) {
                    res.json(result);
                });
       }
   })
});

app.post('/rename_category/:id/:name', function(req, res) {
   Category.update({_id: req.params.id},{categorieName: req.params.name}, function(err, done) {
      if(err){
          res.json({error: 'Error'})
      }else {
          Category.find({user_id : req.user.username._id}, function(err, result) {
              res.json(result);
          });
      }
   });
});

app.post('/rename_sub_category/:id/:name', function(req, res) {
   subCategory.update({_id: req.params.id},{subCategorieName: req.params.name}, function(err, done) {
      if(err){
          res.json({error: 'Error'})
      }else {
          subCategory.find({user_id : req.user.username._id}, function(err, result) {
              res.json(result);
          });
      }
   });
});

app.post('/rename_item_category/:id/:name', function(req, res) {
   itemCategory.update({_id: req.params.id},{itemCategorieName: req.params.name}, function(err, done) {
      if(err){
          res.json({error: 'Error'})
      }else {
          itemCategory.find({user_id : req.user.username._id}, function(err, result) {
              res.json(result);
          });
      }
   });
});

app.get('/user', function(req, res, next) {
    if(req.user) {
        res.render('home', {
            username: req.user.username.username
        });
    }else {
        res.redirect('/');
    }
});

app.post('/new_expense', function(req, res, next) {
    if(req.user){
        Expense.createExpense(req.user.username._id, req.body, function(err, result) {
                if(err) {
                    console.log(err);
                    res.json({ status: 'Something went wrong...' });
                }
                else {
                    Expense.find({user : req.user.username._id}, function(err, result) {
                        res.json(result);
                    });
                }
            });
    }else{
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

app.get('/expenses', function(req, res, next) {
    if(req.user) {
        res.render('viewExpenses');
    }else {
        res.redirect('/');
    }
});

app.get('/view-expenses', function(req, res, next) {
    if(req.user) {
        Expense.find({user : req.user.username._id}, function(err, result) {
            res.json(result);
        });
    }else {
        res.redirect('/');
    }
});

app.delete('/delete-expense/:id', function(req, res, next) {
   if(req.user) {
       Expense.findOneAndRemove({
           _id: req.params.id
       }, function(err, done) {
          if(err){res.json({status: 'Server error'})}else{
              Expense.find({user : req.user.username._id}, function(err, result) {
                  res.json(result);
              });
          }
       });
   }else {
       res.redirect('/');
   }
});

app.listen(config.url.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
