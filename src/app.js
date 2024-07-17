// Import dependencies
import handleAsync from "express-async-handler";
import setupApp from "../base-template/src/app.js";
import configureMongoose from "./config/configureMongoose.js";
import setupServer from "../base-template/src/server.js";
import configureAppMiddleware from "./config/configureAppMiddleware.js";
import configureRoutes from "./config/configureRoutes.js";
import globalErrorHandler from "../base-template/src/utils/errors/globalErrorHandler.js";

// Main function to setup and start the server
const main = handleAsync(async () => {
  const app = setupApp(); // Initialize the app

  await configureMongoose(); // Await database connection
  await setupServer(app); // Start the server
  await configureAppMiddleware(app); // Configure middleware - currently empty!
  configureRoutes(app); // Configure routes

  // Error handling middleware should be last
  app.use(globalErrorHandler);
});

// Execute main function
main();
