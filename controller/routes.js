const express = require('express');
const router = express.Router();
const controller = require('../services/service');
const { addUser, loginUser, allUser, userWithName, allQuestionData, questionwithId, questionWithCategory, allSurvey, surveyWithId, allResults, resultWithId } = require('../services/data');

router.get('/', (req, res) => {
	res.status(200).send('Welcome to DevOps-Survey Maturity Level');
});

router.get('/health', controller.healthCheck);

//USERS
router.post('/adduser', addUser);
router.post('/login', loginUser);
router.get('/users', allUser);
router.get('/users/:firstname', userWithName);

//QUESTIONS
router.get('/questions', allQuestionData);
router.get('/questions/:id', questionwithId);
router.get('/questions/sections/:sectionname', questionWithCategory);

//SURVEYS
router.get('/allsurveys', allSurvey);
router.get('/allsurveys/:surveyid', surveyWithId);

//RESULT
router.get('/allresults', allResults);
router.get('/allresults/:surveyid', resultWithId);

router.get('*', controller.errorHandler);
module.exports = router;