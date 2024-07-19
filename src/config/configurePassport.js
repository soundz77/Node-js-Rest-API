import passport from "passport";
import session from "express-session";
import User from "../models/UserModel.js";
import LocalStrategy from "passport-local";
import sessionConfig from "./configureSession.js";

const passportConfig = (app) => {
  // Apply session middleware
  app.use(session(sessionConfig));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate())
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default passportConfig;
