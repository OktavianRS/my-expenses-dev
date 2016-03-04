var crypto = require('crypto');

var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');

var expenseSchema = new Schema({
    user: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    what: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    }
  
});

expenseSchema.statics.createExpense = function(user_id, date, category, what, price, callback) {
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
        var users = {user: user_id, date: date, category: category, what: what, price: price};
        var user = new mongoose.models.Expense(users);
        user.save(callback);
    };
};

var Expense = exports.Expense = mongoose.model('Expense', expenseSchema);

