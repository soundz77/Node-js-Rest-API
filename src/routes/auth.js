import express from "express";
import passport from "passport";
import FacebookStrategy from "../config/passportFacebook.js"; // required
import google from "../config/googleStrategy.js"; // required

import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";
import register from "../controllers/auth/register.js";
import protectedRoute from "../controllers/auth/protectedRoute.js";
import ensureIsAuthenticated from "../controllers/auth/ensureIsAuthenticated.js";
import ensureIsNotAuthenticated from "../controllers/auth/ensureIsNotAuthenticated.js";
import googleRedirect from "../controllers/auth/googleRedirect.js";
import facebookCallback from "../controllers/auth/facebookCallback.js";
import refreshJWT from "../controllers/auth/refreshJWT.js";
import revokeRefresh from "../controllers/auth/revokeRefresh.js";

const authRouter = express.Router();

authRouter.post("/login", ensureIsNotAuthenticated, login);
authRouter.post("/logout", ensureIsAuthenticated, logout);
authRouter.post("/register", ensureIsNotAuthenticated, register);

authRouter.get("/protected", ensureIsAuthenticated, protectedRoute);
authRouter.post("/refreshToken", ensureIsAuthenticated, refreshJWT);
authRouter.post("/revoketoken", ensureIsAuthenticated, revokeRefresh);

authRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/error",
  }),
  facebookCallback
);
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/error",
  }),
  googleRedirect
);

export default authRouter;
