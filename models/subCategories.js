var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');


var subCategorySchema = new Schema({
    subCategorieName : {
        type: String,
        unique: true
    },
    category_id: {
        type: String
    },
    user_id: {
        type: String
    }
});

subCategorySchema.statics.createSubCategory = function(user, categorie_id, subCategorieName, callback) {
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
        var subCategories = {user_id : user, subCategorieName: subCategorieName, category_id: categorie_id };
        var subCategory = new mongoose.models.subCategory(subCategories);
        subCategory.save(callback);
    };
};

var subCategory = exports.subCategory = mongoose.model('subCategory', subCategorySchema);