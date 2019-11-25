const AWS = require('aws-sdk');
require('dotenv').config();
const SESconfig = {
	apiVersion: '2010-12-01',
	accessKeyId: process.env.KEY,
	secretAccessKey: process.env.AWS_SECRET,
	region: process.env.REGION
};

const ses = new AWS.SES(SESconfig);

const sendEmail = (req, res) => {
	const to = req.body.to;
	const subject = 'Welcome to Singtel !!';
	const message = '<h1> Hello </h1> <br> <h4>You are recieving this email because you recently made contact to Singtel.<br> Below link will take us to asses your different level of devops so that we can understand your devops maturity level.<br>Please click on below link to continue </h4><br>http://singtel-elb-front-1227123907.us-east-1.elb.amazonaws.com:3000/#/ <br><h4>We thank you for your valuable time devoting to us.</h4><br><h2> Best Regards <br>Singtel</h2>';
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
			// console.log(err, err.stack);
			res.status(400).json(err);
		} else {
			// console.log('Email sent.', data);
			res.status(200).json(data);
		}
	});
	
};

module.exports = {sendEmail};