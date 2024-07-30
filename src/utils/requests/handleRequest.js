import handleAsync from "express-async-handler";
import loggingMessages from "../logging/loggingMessages.js";
import requestUtils from "./requestUtils.js";
import { validationResult, matchedData } from "express-validator";
import checkVarsSet from "../../../base-template/src/utils/validation/checkVarsSet.js";

const handleRequest = handleAsync(async (req, res) => {
  const messages = loggingMessages.crud.errors;

  // Check necessary variables have been set
  checkVarsSet({ req, res, messages: messages.invalidRequest });

  // Ensure req.body is not empty and that req.params and req.query are empty
  const requestError = requestUtils.checkRequestErrors(req, res, messages.invalidRequest);
  if (requestError) {
    return res.status(400).json({ message: requestError });
  }

  // Check for duplicate keys in the request body
  if (requestUtils.checkNoDuplicates(req.body)) {
    return res.status(400).json({ message: messages.duplicateFields});
  }

  // Get validation results from the schema applied in the route definition
  const result = validationResult(req);

  // If validation failed, return the first error
  if (!result.errors) {
    return requestUtils.hasValidationErrors(req, res, result.errors);
  }

  // If validation passes, return validated data
  return matchedData(req);
});

export default handleRequest;
