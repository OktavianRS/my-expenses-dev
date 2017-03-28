Category = require(__dirname + '/../models/categories').Category

exports.init = function(user) {
  Category.createCategory(user._id, 'Shoping');
  Category.createCategory(user._id, 'Traveling');
  Category.createCategory(user._id, 'Sport');
}
