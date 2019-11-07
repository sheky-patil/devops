/*****
 * Winston is a simple and universal logging library with support for multiple transports.
 * A transport is essentially a storage device for your logs. Each instance of a winston logger
 * can have multiple transports configured at different levels.
 */
const winston = require('winston');

const logger = winston.createLogger({
	format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.colorize()),
	transports: [
		new winston.transports.File({
			filename: __dirname + '/../logs/devopsMaturity.log'
		})
	]
});

module.exports = logger;