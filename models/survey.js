const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
	surveyId: String,
	createdOn: Date,
	modifiedOn: Date,
	isOpen: String
}, {
	versionKey: false
});

module.exports = mongoose.model('Survey', surveySchema);
