import userRouter from "../routes/users.js";

const configureRoutes = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("*", (req, res) => {
    res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });
};

export default configureRoutes;
