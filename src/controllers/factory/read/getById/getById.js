import handleAsync from "express-async-handler";
import loggingMessages from "../../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../../utils/requests/requestUtils.js";
import handleRequest from "../../../../utils/requests/handleRequest.js";
import checkVarsSet from "../../../../../base-template/src/utils/validation/checkVarsSet.js";

const getById = (Model) => {
  return handleAsync(async (req, res, next) => {
    // Define logging messages
    const { crud } = loggingMessages;

    // Check required variables are defined
    checkVarsSet({ Model, crud });

    // Handle request and validate data
    const validatedData = await handleRequest(req, res, next);

    // Check whether validation failed
    if (!validatedData?.id) {
      const message = validatedData || crud.errors.invalidRequest;
      return requestUtils.resultNotFound(res, message);
    }

    // Use validated data to get the document
    const result = await Model.findById(validatedData.id);

    // Send response with document or error message
    return !result
      ? requestUtils.resultNotFound(res, crud.errors.get)
      : requestUtils.resultFound(res, crud.success.getOne, result);
  });
};

export default getById;
