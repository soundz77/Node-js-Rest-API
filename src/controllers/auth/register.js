import asyncHandler from 'express-async-handler';
import User from '../../models/UserModel.js';
import passport from 'passport';

const register = asyncHandler(async (req, res) => {
	const { username, email, emailConfirm, password, passwordConfirm } = req.body;

	// Field validations
	if (email !== emailConfirm) {
		return res.status(400).json({ message: 'Emails do not match' });
	}

	if (password !== passwordConfirm) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}

	const userData = {
		username,
		email,
		emailConfirm,
		password,
		passwordConfirm,
		avatar: '1.png',
		role: 'user',
	};

	// Add required fields
	const newUser = new User(userData);

	// Attempt to register user
	User.register(newUser, password, (error) => {
		if (error) {
			console.error('Error during user registration:', error);
			return res.status(500).json({ message: 'Unable to register', error });
		}

		// Use passport to authenticate the newly registered user
		passport.authenticate('local', { usernameField: 'email' }, (error, user, info) => {
			if (error) {
				return res.status(500).json({ message: 'Authentication error', error });
			}
			if (!user) {
				return res.status(400).json({ message: 'Invalid credentials', error: info });
			}

			// Log the user in
			req.login(user, (error) => {
				if (error) {
					return res.status(500).json({ message: 'Login error', error });
				}
				return res.status(200).json({ message: 'Thanks for registering!', user });
			});
		})(req, res);
	});
});

export default register;
