
import jwt from 'jsonwebtoken';
import passport from "passport";

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
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Set refresh token in an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
      
        // Set token in the `Authorization` header
        res.setHeader('Authorization', `Bearer ${token}`);
      
        res.status(200).json({ message: 'Login successful' });
      } catch(error) {
        res.status(500).json({ message: 'Token generation error', error });
      }
  });
  })(req, res, next);
};

export default login;
