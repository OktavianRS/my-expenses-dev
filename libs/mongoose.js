var mongoose = require('mongoose');
config =require(__dirname + '/../configs/config');
mongoose.connect(config.database.url);

module.exports = mongoose;