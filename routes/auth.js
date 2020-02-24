
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../middleware/auth/config');
const uuidv1 = require('uuid/v1');

module.exports = function ({ app, localStorage }) {
	app.post('/api/signUp', function (req, res) {
		try {
			var hashedPassword = bcrypt.hashSync(req.body.password, 8);
			let uid = uuidv1();
			let name = req.body.name;
			let email = req.body.email;
			let password = hashedPassword;

			if(!(name && email && password)) {
				return res.status(422).send({ message: 'Please provide all the mandatory fields.' });
			}

			localStorage.setItem(`user_${email}`, JSON.stringify({ id: uid, name, email, password }));
			var token = jwt.sign({ id: uid, email: email}, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			});
			res.status(200).send({ auth: true, token: token });
		} catch (err) {
			res.status(500).send("There was a problem registering the user.");
		}
	});

	app.get('/api/validateToken', (req, res) => {
		var token = req.headers['authorization'];
		if (!token)
			return res.status(403).send({ auth: false, message: 'No token provided.' });

		jwt.verify(token, config.secret, function (err, decoded) {
			if (err)
				return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

			let key = `user_` + decoded.email;
			let user = localStorage.getItem(key);
			if(user) {
				let {name, email, id} = JSON.parse(user);
				return res.status(200).send({auth: true, user: {name, email, id}});
			} else 
			{
				return res.status(500).send({ auth: false, message: 'User not found.' });
			}
		});
	});


	app.post('/api/login', function (req, res) {
		try {
			let key = `user_` + req.body.email;
			let userDetails = localStorage.getItem(key);
			if (userDetails) {
				userDetails = JSON.parse(userDetails);
				var passwordIsValid = bcrypt.compareSync(req.body.password, userDetails.password);
				if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

				var token = jwt.sign({ id: userDetails.id, email: userDetails.email }, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				});
				res.status(200).send({ auth: true, token: token, user: { id: userDetails.id, email: userDetails.email, name: userDetails.name } });

			} else {
				res.status(404).send({ auth: false, message: "User not found." });
			}

		} catch (err) {
			return res.status(500).send('Error on the server.');
		}
	});
}