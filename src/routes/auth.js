import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import FacebookStrategy from '../config/passportFacebook.js';
import google from '../config/googleStrategy.js';

import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
import register from '../controllers/auth/register.js';
import protectedRoute from '../controllers/auth/protectedRoute.js';
import ensureIsAuthenticated from '../controllers/auth/ensureIsAuthenticated.js';
import ensureIsNotAuthenticated from '../controllers/auth/ensureIsNotAuthenticated.js';

const authRouter = express.Router();

authRouter.post('/login', ensureIsNotAuthenticated, login);
authRouter.post('/logout', ensureIsAuthenticated, logout);
authRouter.post('/register', ensureIsNotAuthenticated, register);
authRouter.get('/protected', ensureIsAuthenticated, protectedRoute);

// Initiate Facebook authentication
authRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Handle the callback after Facebook has authenticated the user
authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/error' }),
  (req, res) => {
    if (req.user) {
      const token = jwt.sign(
        {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          avatar: req.user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.redirect(`http://localhost:3000/authSuccess?token=${token}`);
    } else {
      res.redirect('http://localhost:3000/login');
    }
  }
);

// Initiate Google authentication
authRouter.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Handle the callback after Google has authenticated the user
authRouter.get('/oauth2/redirect/google', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/error' }), (req, res) => {
  if (req.user) {
    const token = jwt.sign(
      {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.redirect(`http://localhost:3000/authSuccess?token=${token}`);
  } else {
    res.redirect('http://localhost:3000/login');
  }
});

export default authRouter;
