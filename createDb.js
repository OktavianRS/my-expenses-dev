var mongoose = require(__dirname + '/libs/mongoose');
mongoose.set('debug', true);
var async = require('async');
var User = require(__dirname + '/models/user').User;


async.series([
    open,
    requireModels,
    createUsers
], function(err, results) {
    mongoose.disconnect();
    console.log(arguments);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function requireModels(callback) {
    require(__dirname + '/models/user');
    
    async.each(Object.keys(mongoose.models), function(modelName, callback) {
       mongoose.models[modelName].ensureIndexes(callback); 
    }, callback);
}

function createUsers(callback) {
    var users =         { username : "another", password : "one" };
       var user = new mongoose.models.User(users);
        user.save(callback);
};