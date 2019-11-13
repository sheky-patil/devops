const jwt    = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;

const validateToken = (req, res, next) => {
   
	// check header for the token
	const token = req.headers.authorization;

	// decode token
	if (token) {
		// verifies secret and checks if the token is expired
		jwt.verify(token, secret, (err, decoded) =>{      
			if (err) {
				res.status(404).json({ message: 'invalid token' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});
   
	} else {
   
		// if there is no token  
   
		res.status(404).json({ message: 'No token provided.'});
	}
};

module.exports = {
	validateToken
};