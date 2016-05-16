var crypto = require('crypto');

var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');

var expenseSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    category_id: {
        type: String
    },
    subCategory_id: {
        type: String
    },
    itemCategory_id: {
        type: String
    },
    categoryName: {
        type: String
    },
    what: {
        type: String,
        required: true
    },
    priceDollars: {
        type: Number,
        required: false
    },
    priceCents: {
        type: Number,
        require: false
    }
  
});

expenseSchema.statics.createExpense = function(user_id, data, callback) {
    console.log(data.params);
  async.series([
      requireModels,
      createUsers
  ], function(err, results) {
      if(err) {
          callback(err);
      }else{
          callback(null, arguments[1][1][0]);
      }
  });
    
    function open(callback) {
        mongoose.connection.on('open', callback);
        callback();
    }
    
    function requireModels(callback) {
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback); 
        }, callback);
    }
    
    function createUsers(callback) {
        var users = {user: user_id, date: data.params.date, category_id: data.params.category_id, subCategory_id: data.params.subCategory_id, itemCategory_id: data.params.itemCategory_id, categoryName: data.params.categoryName, what: data.params.what, priceDollars: data.params.priceDollars, priceCents: data.params.priceCents};
        var user = new mongoose.models.Expense(users);
        user.save(callback);
    };
};

var Expense = exports.Expense = mongoose.model('Expense', expenseSchema);

