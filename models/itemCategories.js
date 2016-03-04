var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');


var itemCategorySchema = new Schema({
    itemCategorieName : {
        type: String,
        unique: true
    },
    subCategorie_id: {
        type: String
    },
    user_id: {
        type: String
    }
});

itemCategorySchema.statics.createItemCategory = function(user, subCategorie_id, itemCategorieName, callback) {
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
        var itemCategories = { user_id: user, itemCategorieName: itemCategorieName, subCategorie_id: subCategorie_id };
        var itemCategory = new mongoose.models.itemCategory(itemCategories);
        itemCategory.save(callback);
    };
};

var itemCategory = exports.itemCategory = mongoose.model('itemCategory', itemCategorySchema);