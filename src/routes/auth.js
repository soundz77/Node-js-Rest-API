import express from "express";
const authRouter = express.Router();

import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";
import register from "../controllers/auth/register.js";
import protectedRoute from "../controllers/auth/protectedRoute.js";
import ensureIsAuthenticated from "../controllers/auth/ensureIsAuthenticated.js";
import ensureIsNotAuthenticated from "../controllers/auth/ensureIsNotAuthenticated.js";

authRouter.post("/login", ensureIsNotAuthenticated, login);
authRouter.post("/logout", ensureIsAuthenticated, logout);
authRouter.post("/register", ensureIsNotAuthenticated, register);
authRouter.get("/protected", ensureIsAuthenticated, protectedRoute);

export default authRouter;
