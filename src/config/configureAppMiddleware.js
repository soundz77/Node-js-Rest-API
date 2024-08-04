import cookieParser from "cookie-parser";

const appMiddleware = (app) => {
  app.use(cookieParser());

  return app;
};

export default appMiddleware;
