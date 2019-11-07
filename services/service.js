'use strict';
const logger = require('./logger');
//config for database
require('dotenv').config();
const url = process.env.MONGOLAB_URI;
//Connecting for database.
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


const errorHandler = (req, res) => {
	res.status(400).json({
		message : 'Opss something went wrong'
	});
};

const healthCheck = (req, res) => {
	logger.info('Reached HealthCheack');
	res.status(200).json({
		message : 'Success',
		database : 'Connected to MongoDB successfully !!'
	});
};

module.exports = {errorHandler, healthCheck};