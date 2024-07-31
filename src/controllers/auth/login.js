import jwt from 'jsonwebtoken';
import passport from 'passport';

// Sends a JWT in HTTP headers as a bearer token

const login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({ message: 'Authentication error', error: err });
		}
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials', error: info });
		}

		req.login(user, (err) => {
			if (err) {
				return res.status(500).json({ message: 'Login error', error: err });
			}

			try {
				// Generate token
				const { id, username, avatar, email } = user;
				const payload = { id, username, avatar, email };

				const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
				const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

				// Set token in the `Authorization` header
				res.setHeader('Authorization', `Bearer ${token}`);

				// Set refresh token in HTTP-only cookie
				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'None',
					maxAge: 7 * 24 * 60 * 60 * 1000,
				});

				res.status(200).json({ message: 'Login successful' });
			} catch (error) {
				res.status(500).json({ message: 'Token generation error', error });
			}
		});
	})(req, res, next);
};

export default login;
