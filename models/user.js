const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	surveyId: String,
	userId: String,
	firstName: String,
	lastName: String,
	userName: String,
	passWord: String,
	emailId: String,
	status: String,
	isAdmin:String
}, {
	versionKey: false
});

module.exports = mongoose.model('User', userSchema);
