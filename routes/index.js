
/*
 * GET home page.
 */

exports.login = function(req, res){
  res.render('login', {
      title: "Sign In"
  })
};

exports.registration = function(req, res) {
    res.render('registration', {
        title: "Registration"   
    })
};

exports.home = function(req, res) {
    res.render('index', {
        title: 'express'
    })
};