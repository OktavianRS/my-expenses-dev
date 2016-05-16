var crypto = require('crypto');

var mongoose = require(__dirname + '/../libs/mongoose'),
  Schema = mongoose.Schema,
    async = require('async');

var schemaSocial = new Schema({
  google: {
      id: String,
      token: String,
      email: String,
      username: String
  }
});

schemaSocial.statics.authorize = function(id, token, email, name, callback) {
        async.waterfall([
            function(callback) {
                UserSocial.findOne({'google.id' : id}, callback);
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
                            var users = {'google.id': id, 'google.token': token, 'google.email': email, 'google.username': name};
                            var user = new mongoose.models.UserSocial(users);
                            user.save(callback);
                        };
                }//end of else
            }
        ], callback);
};

var UserSocial = exports.UserSocial = mongoose.model('UserSocial', schemaSocial);