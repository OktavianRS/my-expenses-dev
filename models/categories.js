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

categorySchema.statics.createCategory = function(user, categorieName) {
  async.series([
      requireModels,
      createCategory
  ], function(err, results) {

  });

    function requireModels() {
        async.each(Object.keys(mongoose.models), function(modelName) {
            mongoose.models[modelName].ensureIndexes();
        });
    }

    function createCategory() {
        var categories = { categorieName: categorieName, user_id : user };
        var category = new mongoose.models.Category(categories);
        category.save();
    };
};

var Category = exports.Category = mongoose.model('Category', categorySchema);
