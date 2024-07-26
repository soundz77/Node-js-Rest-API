import passport from "passport";
import User from "../models/UserModel.js";
import { Strategy as FacebookStrategy } from "passport-facebook";
// import env from "../../base-template/src/utils/validation/validateProcessEnv.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_CLIENT_ID"],
      clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
      callbackURL: "http://localhost:3001/api/v1/auth/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ facebookId: profile.id });

        if (user) {
          // User already exists, log them in
          return done(null, user);
        } else {
          // User doesn't exist, create a new user
          const { id, displayName, emails, provider } = profile;
          user = new User({
            facebookId: id,
            username: displayName,
            displayName,
            email: emails[0].value,
            emailConfirm: emails[0].value,
            password: "testpassword",
            passwordConfirm: "testpassword",
            provider,
          });

          await user.save();

          // Log in the newly created user
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default FacebookStrategy;
