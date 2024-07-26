import passport from "passport";
import User from "../models/UserModel.js";
import GoogleStrategy from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/v1/auth/oauth2/redirect/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          emailConfirm: profile.emails[0].value,
          password: '!#Bc2349229',
          passwordConfirm: '!#Bc2349229',
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);


export default GoogleStrategy;