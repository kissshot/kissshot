var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	password: String,
	email: String,
	role: String,
	created: Date,
});

var User = mongoose.model('User', userSchema);
module.exports = User;