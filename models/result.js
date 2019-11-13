const mongoose = require('mongoose');

// const allQnA = mongoose.Schema({
// 	questionId: String,
// 	questionDescription: String, 
// 	questionWeightage:Number,
// 	providedOption: String,
// 	weightage: Number
// },{
// 	versionKey:false
// });

const resultSchema = mongoose.Schema({
	surveyId: String,
	userId: String,
	userName: String,
	result: [Object],
	remark: String,
	surveyWeightage: Number
},{
	versionKey:false
});

module.exports = mongoose.model('Result', resultSchema);