const express = require('express');
const router = express.Router();
const controller = require('../services/service');
const { 
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
	resultWithId,
	sendEmailInvite, 
} = require('../services/data');

const middleware = require('../middleware/index');

router.get('/', (req, res) => {
	res.status(200).send('Welcome to DevOps-Survey Maturity Level');
});

router.get('/health', controller.healthCheck);

//USERS
router.post('/adduser', addUser);
router.post('/login', loginUser);
router.post('/forgot', forgotPassword);
router.put('/reset', resetPassword);
router.get('/users', middleware.validateToken, allUser);
router.get('/users/:firstname', middleware.validateToken, userWithName);

//QUESTIONS
router.get('/questions', middleware.validateToken, allQuestionData);
router.get('/questions/:id', middleware.validateToken, questionwithId);
router.get('/questions/sections/:sectionname', middleware.validateToken, questionWithCategory);

//SURVEYS
router.post('/addsurvey', middleware.validateToken, addSurvey);
router.get('/allsurveys', middleware.validateToken, allSurvey);
router.get('/allsurveys/:surveyid', middleware.validateToken, surveyWithId);

//RESULT
router.post('/result', middleware.validateToken, addFinalResult);
router.get('/allresults', middleware.validateToken, allResults);
router.get('/allresults/:surveyid', middleware.validateToken, resultWithId);

//Email Invite
router.post('/send', sendEmailInvite);

router.get('*', controller.errorHandler);
module.exports = router;