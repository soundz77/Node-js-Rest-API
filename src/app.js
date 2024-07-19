// Import dependencies
import handleAsync from "express-async-handler";
import setupApp from "../base-template/src/app.js";
import configureMongoose from "./config/configureMongoose.js";
import setupServer from "../base-template/src/server.js";
import configureAppMiddleware from "./config/configureAppMiddleware.js";
import configureRoutes from "./config/configureRoutes.js";
import globalErrorHandler from "../base-template/src/utils/errors/globalErrorHandler.js";
import configurePassport from "./config/configurePassport.js";

// Main function to setup and start the server
handleAsync(async () => {
  const app = setupApp(); // Initialize the app

  await configureMongoose(); // Await database connection
  configurePassport(app); // Configure passport and session
  configureAppMiddleware(app); // Configure middleware
  configureRoutes(app); // Configure routes
  await setupServer(app); // Start the server

  // Error handling middleware should be last
  app.use(globalErrorHandler);
})();
