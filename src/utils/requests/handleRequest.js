import handleAsync from "express-async-handler";
import loggingMessages from "../logging/loggingMessages.js";
import requestUtils from "./requestUtils.js";
import { validationResult, matchedData } from "express-validator";
import checkVarsSet from "../../../base-template/src/utils/validation/checkVarsSet.js";

const handleRequest = handleAsync(async (req, res) => {
  const messages = loggingMessages.crud.errors.invalidRequest;

  checkVarsSet({ req, res, messages });

  // Ensure req.body is not empty and that req.params and req.query are empty
  const requestError = requestUtils.checkRequestErrors(req, res, messages);

  if (requestError) {
    return res.status(400).json({ message: requestError });
  }

  // Check for duplicate keys in the request body
  const keys = Object.keys(req.body);
  const uniqueKeys = new Set(keys);

  if (uniqueKeys.size !== keys.length) {
    return res
      .status(400)
      .json({ message: "Duplicate keys found in the request body" });
  }

  // Get validation messages (using the schema applied to the route)
  const result = validationResult(req);

  // If validation failed, return the first error<
  if (!result.errors) {
    return requestUtils.hasValidationErrors(req, res, result.errors);
  }

  // If validation passes, get the validated data
  const validatedData = matchedData(req);

  return validatedData;
});

export default handleRequest;
