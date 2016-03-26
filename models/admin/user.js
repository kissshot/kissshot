var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	account: String,
	password: String,
	email: String,
	role: String,
	created: Date,
	authHash: String,
	lastLogin: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;
