const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
	surveyId: String,
	userId: String,
	userName: String,
	result: [
		{
			questionId: String,
			questionDescription: String, 
			questionWeightage:Number,
			providedOption: String,
			weightage: Number
		}
	],
	remark: String,
	surveyWeightage: Number
},{
	versionKey:false
});

module.exports = mongoose.model('Result', resultSchema);