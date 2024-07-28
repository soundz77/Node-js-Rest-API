import express from "express";
import RateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import httpLogger from "../utils/logging/HTTPlogger.js";
import { strictCors } from "./middleware/corsConfig.js";
import { generalLimiter } from "./middleware/rateLimitConfig.js";
import helmetConfig from "./middleware/helmetConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configureMiddleware = (app) => {
  app.use(httpLogger);
  app.use(helmet(helmetConfig));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(RateLimit(generalLimiter));
  app.use(compression());
  app.use(cors(strictCors));
  app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, "../../public")));
};

export default configureMiddleware;
