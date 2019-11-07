/* eslint-disable quotes */
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true });

// const uuid = require('uuid');

// const Survey = require('./models/survey');
// const Result = require('./models/result');

//Creating Survey with required attribute.

// Survey.create({
// 	surveyId: uuid(),
// 	createdOn: Date(),
// 	modifiedOn: null,
// 	isOpen: 'Open'
// }, (err, data) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(data);
// 	}
// });


// Creating dummy result.

// Result.create({
// 	surveyId: "9ddb75bd-3fec-4853-8d8f-40d1fb69844b",
// 	userId: "27cdcb26-5f3c-47c6-9008-b1f532b76535",
// 	userName: "Preet",
// 	result: [
// 		{
// 			questionId: "T1",
// 			questionDescription: "How environments are provisoned?", 
// 			questionWeightage:10,
// 			providedOption: "Environments  are provisioned manually.",
// 			weightage: 1*10
// 		},
// 		{
// 			questionId: "T2",
// 			questionDescription: "What process are being followed for testing?", 
// 			questionWeightage:10,
// 			providedOption: "Functional test automation",
// 			weightage: 1.5*10
// 		},
// 		{
// 			questionId: "T3",
// 			questionDescription: "How DB changes are managed?", 
// 			questionWeightage:10,
// 			providedOption: "DB changes performed automatically as part of deployment process",
// 			weightage: 2.5*10
// 		},
// 		{
// 			questionId: "T4",
// 			questionDescription: "How code/build deployment is done?", 
// 			questionWeightage:10,
// 			providedOption: "Production deployment automation.",
// 			weightage: 2*10
// 		},
// 		{
// 			questionId: "T5",
// 			questionDescription: "What process is followed for software building?", 
// 			questionWeightage:10,
// 			providedOption: "Continous work on process improvement,better visibility, faster feedback.",
// 			weightage: 3*10
// 		},
// 		{
// 			questionId: "T6",
// 			questionDescription: "How environments are provisoned?", 
// 			questionWeightage:10,
// 			providedOption: "Environments  are provisioned manually.",
// 			weightage: 1*10
// 		},
// 		{
// 			questionId: "T7",
// 			questionDescription: "What process are being followed for testing?", 
// 			questionWeightage:10,
// 			providedOption: "Functional test automation",
// 			weightage: 1.5*10
// 		},
// 		{
// 			questionId: "T8",
// 			questionDescription: "How DB changes are managed?", 
// 			questionWeightage:10,
// 			providedOption: "DB changes performed automatically as part of deployment process",
// 			weightage: 2.5*10
// 		},
// 		{
// 			questionId: "T9",
// 			questionDescription: "How code/build deployment is done?", 
// 			questionWeightage:10,
// 			providedOption: "Production deployment automation.",
// 			weightage: 2*10
// 		},
// 		{
// 			questionId: "T10",
// 			questionDescription: "What process is followed for software building?", 
// 			questionWeightage:10,
// 			providedOption: "Continous work on process improvement,better visibility, faster feedback.",
// 			weightage: 3*10
// 		}  
// 	],
// 	remark: "Intermediate",
// 	surveyWeightage: 69
// },(err, data) => {
// 	if(err){
// 		console.log(err);
// 	}
// 	else {
// 		console.log(data);
// 	}
// });