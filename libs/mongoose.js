var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Beetroot@ds062438.mongolab.com:62438/myexpenses');

module.exports = mongoose;