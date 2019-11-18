/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';
require('dotenv').config();
const secret = process.env.SECRET;
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

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
	const is_Admin = req.body.isadmin;
	User.findOne({userName:uname}, (err, data) => {
		if(err){
			res.status(404).json(err);
		}
		else {
			if(!data){
				User.create({
					surveyId: uuid(),
					userId: uuid(),
					firstName: fname,
					lastName: lname,
					userName: uname,
					passWord: newpassword,
					emailId: emailid,
					status: 'Enable',
					isAdmin: is_Admin
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
			}
			else {
				console.log(data);
				res.status(200).json({
					message: 'Username already exists !!'
				});
			}
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
			const payload = {

				check:  true
	
			  };
			let token = jwt.sign(payload, secret, {
				expiresIn: 1800 // expires in half hour
	        }); 
			res.status(200).json({
				message: 'Success',
				token: token
			});
		}
		else {
			res.status(404).json({
				message: 'You have entered wrong password'
			});
		}
	});
};

// forgot password api to check weather email id exist or not?
const forgotPassword = (req, res) => {
	const email_Id = req.body.emailid;
	User.findOne({emailId: email_Id}, (err, data) => {
		if(err){
			res.status(404).json(err);
		}
		else {
			if(!data){
				res.status(404).json({
					message: 'Email does not exist'
				});
			}
			else {
				console.log(data);
				res.status(200).json({
					message: 'Email exists !!'
				});
			}
		}
	});
};

// Resetting the password for particular user with email id,
const resetPassword = (req, res) => {
	// const user_Id = req.body.userid;
	const email_Id = req.body.emailid;
	const confirm_pwd = req.body.confirmpwd;
	let newConfirm_pwd = bcrypt.hashSync(confirm_pwd, 8);
	console.log(confirm_pwd);
	console.log(newConfirm_pwd);
	User.updateOne({ emailId : email_Id }, {$set : { passWord : newConfirm_pwd }}, (err, data)=>{
		if(err){
			res.status(404).json(err);
		}
		else {
			console.log('RecordModified :' + data.nModified);
			res.status(200).json({
				message:'Password updated successfully'
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

//Filling survey collections with surveyId & userId
const addSurvey = (req, res) => {
	const survey_Id = req.body.surveyid;
	const user_Id = req.body.userid;
	Survey.create({
		surveyId : survey_Id,
		userId : user_Id,
		createdOn : Date(),
		modifiedOn : null,
		isOpen : 'Open'
	}, (err, data) => {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log(data);
			res.status(201).json(data);
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

//Adding results into result collections
const addFinalResult = (req, res) => {
	const survey_Id = req.body.surveyid;
	const user_Id = req.body.userid;
	const user_Name= req.body.username;
	const result_array = req.body.finalresult;
	const final_remark = req.body.finalremark;
	const final_weightage = req.body.finalweightage;
	Result.create({
		surveyId: survey_Id,
		userId: user_Id,
		serName: user_Name,
		result: result_array,
		remark: final_remark,
		surveyWeightage: final_weightage,
	}, (err, data) => {
		if (err) {
			console.log(err);
			res.status(404).json(err);
		} else {
			console.log(data);
			res.status(201).json({
				message:'Result added successfully'
			});
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
	forgotPassword,
	resetPassword,
	allUser, 
	userWithName,
	allQuestionData, 
	questionwithId,
	questionWithCategory,
	addSurvey,
	allSurvey,
	surveyWithId,
	addFinalResult,
	allResults,
	resultWithId
};