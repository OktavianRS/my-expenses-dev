var crypto = require('crypto');

var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');

var schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback) {
        async.waterfall([
            function(callback) {
                User.findOne({username : username}, callback);
            },
            function(user, callback) {
                if(user) {
                    if(user.checkPassword(password)) {
                        callback(null, user);
                    } else {
                        callback(true, false);
                    }
                } else {
                    callback(true, false);
                }
            }
        ], callback);
};

schema.statics.create = function(username, password, callback) {
    mongoose.set('debug', true);
  async.series([
      requireModels,
      createUsers
  ], function(err, results) {
      if(err) {
          callback(err);
      }else{
          callback(null, arguments[1]);
      }
  });
    
    function open(callback) {
        mongoose.connection.on('open', callback);
        callback();
    }
    
    function requireModels(callback) {
        console.log(2);
        async.each(Object.keys(mongoose.models), function(modelName, callback) {
            mongoose.models[modelName].ensureIndexes(callback); 
        }, callback);
    }
    
    function createUsers(callback) {
        var users =         { username : username, password : password };
        var user = new mongoose.models.User(users);
        user.save(callback);
    };
};

var User = exports.User = mongoose.model('User', schema);
