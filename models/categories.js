var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');

var categorySchema = new Schema({
    categorieName : {
        type: String,
        unique: false
    },
    user_id: {
        type: String
    }
});

categorySchema.statics.createCategory = function(user, categorieName, callback) {
  async.series([
      requireModels,
      createCategory
  ], function(err, results) {
      if(err) {
          callback(err);
      }else{
          callback(null, arguments[1][1][0]);
      }
  });
    
    function requireModels(callback) {
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback); 
        }, callback);
    }
    
    function createCategory(callback) {
        var categories = { categorieName: categorieName, user_id : user };
        var category = new mongoose.models.Category(categories);
        category.save(callback);
    };
};

var Category = exports.Category = mongoose.model('Category', categorySchema);