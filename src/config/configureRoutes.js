import userRouter from "../routes/users.js";
import authRouter from "../routes/auth.js";
import tokenRouter from "../routes/tokens.js";

const configureRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/tokens", tokenRouter);
  app.use("*", (req, res) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });
};

export default configureRoutes;
