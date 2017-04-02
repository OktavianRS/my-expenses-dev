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

var googleSchema = new Schema({
      id: {
          type: String
      },
      token: {
          type: String
      },
      email: {
          type: String
      },
      username: {
          type: String
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
        var users =         { username : username, password : password };
        var user = new mongoose.models.User(users);
        user.save(callback);
    };
};

googleSchema.statics.authorizeGoogle = function(id, token, email, name, callback) {
        async.waterfall([
            function(callback) {
                googleUser.findOne({id : id}, callback);
            },
            function(user, callback) {
                if(user) {
                    callback(null, user);
                } else {
                        async.series([
                            open,
                            requireModels,
                            createUsers
                        ], function(err, results) {
                            if(err) {
                                callback(err);
                            }else{
                                callback(null, arguments[1][2][0].google);
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
                            var users = {id: id, token: token, email: email, username: name};
                            var user = new mongoose.models.googleUser(users);
                            user.save(callback);
                        };
                }//end of else
            }
        ], callback);
};

var User = exports.User = mongoose.model('User', schema);
var googleUser = exports.googleUser = mongoose.model('googleUser', googleSchema);
