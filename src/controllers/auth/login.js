
import jwt from 'jsonwebtoken';
import passport from "passport";

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
      // Generate token
        const { id, username, avatar, email } = user;
        const payload = { id, username, avatar, email }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.status(200).json({ message: 'Login successful', token });
    });
  })(req, res, next);
};

export default login;
