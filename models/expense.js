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
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
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

expenseSchema.statics.createExpense = function(user_id, date, category, what, priceDollars, priceCents, callback) {
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
        var users = {user: user_id, date: date, category: category, what: what, priceDollars: priceDollars, priceCents: priceCents};
        var user = new mongoose.models.Expense(users);
        user.save(callback);
    };
};

var Expense = exports.Expense = mongoose.model('Expense', expenseSchema);

