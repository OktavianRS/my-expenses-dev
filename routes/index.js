
/*
 * GET home page.
 */

exports.login = function(req, res){
  res.render('login', {
      title: "Sign In"
  })
};

exports.loader = function(req, res) {
    res.render('loader');
};

exports.loginUndef = function(req, res) {
    res.render('login', {
        title: "User not found",
        script: "UIkit.notify('Username or password do not match');"
    })
};

exports.registration = function(req, res) {
    res.render('registration', {
        title: "Registration"   
    })
};

exports.registrationFail = function(req, res) {
  res.render('registration', {
      title : "Registration",
      script : "UIkit.notify('User alredy exist');"
  })  
};

exports.home = function(req, res) {
  res.render('home', {
    scriptHref: '/js/user/user.js'  
  })  
};

exports.newExpenses = function(req, res) {
  res.render('newExpenses', {
      
  })  
};