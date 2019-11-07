const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
	option: String,
	weightage: Number
}, {
	versionKey: false
});

const questionSchema = new mongoose.Schema({
	questionId: String,
	questionDescription: String,
	weightage: Number,
	answerType: String,
	category: String,
	score: Number,
	answers: [answerSchema],
	selectedAnswer: [String]
}, {
	versionKey:false
});

module.exports = mongoose.model('Question', questionSchema);