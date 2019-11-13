'use strict';
/* eslint-disable linebreak-style */
const app = require('./app');

//logger setup
const logger = require('./services/logger');

//config setup
require('dotenv').config();
const port = process.env.PORT;
const url = process.env.MONGOLAB_URI;
// const secret = process.env.SECRET;

//Connecting for database.
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	logger.info('Connected to mongoDB');
	console.log('Connected to devops-maturity database !!');
});

app.listen(port, () => {
	logger.info(`Server started at PORT : ${port}`);
	console.log(`Server has started on Port :  ${port}`);
});