
Category = require(__dirname + '/../models/categories').Category;

// login user
exports.create = function(req, res, next) {
  if (req.user) {
    Category.createCategory(req.user.username._id, req.params.name, function(err, result) {
      if (err) {
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
  } else {
    res.json({ 'authorized': false });
  }
};
