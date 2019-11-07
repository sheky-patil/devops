'use strict';

const uuid = require('uuid');
const bcrypt = require('bcryptjs');

const Question = require('../models/questions');
const User = require('../models/user');
const Survey = require('../models/survey');
const Result = require('../models/result');

//Adding user in database
const addUser = (req, res) => {
	
	const fname = req.body.firstname;
	const lname = req.body.lastname;
	const uname = req.body.username;
	const pwd = req.body.password;
	let newpassword = bcrypt.hashSync(pwd, 8);
	console.log(newpassword);
	const emailid = req.body.emailId;
	User.create({
		surveyId: uuid(),
		userId: uuid(),
		firstName: fname,
		lastName: lname,
		userName: uname,
		passWord: newpassword,
		emailId: emailid,
		status: 'Enable'
	}, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json(err);
		} else {
			console.log(data);
			res.status(201).json({
				message: 'User Register Successfully'
			});
		}
	});
};


// Login API - Authentication.
const loginUser = (req, res) => {
	const uname = req.body.username;
	const pwd = req.body.password;

	User.findOne({userName : uname}, (err, data) => {
		if(!data){
			res.status(404).json({
				message: 'User not found'
			});
		}
		else if(bcrypt.compareSync(pwd, data.passWord)){
			res.status(200).json({
				message: 'Success'
			});
		}
		else {
			res.status(404).json({
				message: 'You have entered wrong password'
			});
		}
	});
};


//Retriving all user for database
const allUser = (req, res) => {
	User.find({}, {_id:0, passWord:0}, (err, data)=> {
		if (err) {
			console.log(err);
		} else {
			if(!data.length){
				res.status(404).json({
					message: 'No result found for provided details'
				});
			}
			else {
				res.status(200).json(data);
			}
		}
	});
};


//Retriving user with name
const userWithName = (req, res) => {
	const user = req.params.firstname;
	const name = user.charAt(0).toUpperCase() + user.slice(1);
	User.find({ firstName: name}, {_id:0, passWord:0}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			if(!data.length){
				res.status(404).json({
					message: 'No result found for provided details'
				});
			}
			else {
				res.status(200).json(data);
			}
		}
	});
};


// Retriving all questions
const allQuestionData = (req, res) => {
	Question.find({}, {_id:0}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(data);
		}
	});
};


//Retriving particular question with id
const questionwithId = (req, res) => {
	const Id = req.params.id;
	Question.find({ questionId: Id  }, {_id:0}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			if(!data.length){
				res.status(404).json({
					message: 'No result found for provided details'
				});
			}
			else {
				res.status(200).json(data);
			}
		}
	});
};


// Displaying question according to section/category.
const questionWithCategory = (req, res) => {
	const section = (req.params.sectionname).concat(' Section');
	const newSection = section.charAt(0).toUpperCase() + section.slice(1);
	// console.log(newSection);
	Question.find({category: newSection}, {_id:0}, (err, data) => {
		if(err){
			console.log(err);
		}
		else {
			if(!data.length){
				res.status(404).json({
					message: 'No result found for provided Category'
				});
			}
			else{
				res.status(200).json(data);
			}
		}
	});
};


//Retriving all surveys
const allSurvey = (req, res) => {
	Survey.find({}, {_id:0}, (err, data) => {
		if (err) {
			res.status(500).json(err);
		} else {
			if (!data.length) {
				res.status(404).json({
					message: 'No result found'
				});
			} else {
				res.status(200).json(data);
			}
		}
	});
};


//Retriving all survey with survey :id
const surveyWithId = (req, res) => {
	const survey_Id = req.params.surveyid;
	Survey.find({ surveyId: survey_Id}, {_id:0}, (err, data) => {
		if (err) {
			res.status(404).json(err);
		} else {
			if (!data.length) {
				res.status(404).json({
					message: 'No result found for provided survey id'
				});
			} else {
				res.status(200).json(data);
			}
		}
	});
};


//Retriving all results
const allResults = (req, res) => {
	
	Result.find({}, {_id:0}, (err, data) => {
		if(err){
			res.status(404).json(err);
		}
		else {
			if (!data.length) {
				res.status(404).json({
					message: 'No result found for provided survey id'
				});
			} else {
				res.status(200).json(data);
			}
		}
	});
};

// Result per survey id
const resultWithId = (req, res) => {
	const survey_Id = req.params.surveyid;
	Result.find({surveyId: survey_Id }, {_id:0}, (err, data) => {
		if(err){
			res.status(404).json(err);
		}
		else {
			if (!data.length) {
				res.status(404).json({
					message: 'No result found for provided survey id'
				});
			} else {
				res.status(200).json(data);
			}
		}
	});
};

module.exports = { 
	addUser, 
	loginUser,
	allUser, 
	userWithName,
	allQuestionData, 
	questionwithId,
	questionWithCategory,
	allSurvey,
	surveyWithId,
	allResults,
	resultWithId
};