const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Animals');
mongoose.connect('mongodb://localhost:27017/Users');


module.exports = { mongoose }