const AWS = require('aws-sdk');
require('dotenv').config();
const SESconfig = {
	apiVersion: '2010-12-01',
	accessKeyId: process.env.KEY,
	secretAccessKey: process.env.AWS_SECRET,
	region: process.env.REGION
};

const ses = new AWS.SES(SESconfig);

const sendEmail = (to, subject, message, from) => {
	const params = {
		Source: 'shekhar.patil@blazeclan.com',
		Destination: {
			ToAddresses: [to]
		},
		ReplyToAddresses: [
			'shekhar.patil@blazeclan.com',
		],
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: message
				},
				// replace Html attribute with the following if you want to send plain text emails. 
				Text: {
					Charset: 'UTF-8',
					Data: message
				}
             
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject
			}
		},
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			console.log(err, err.stack);
		} else {
			console.log('Email sent.', data);
		}
	});
};

module.exports = {sendEmail};