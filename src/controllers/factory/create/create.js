import handleAsync from "express-async-handler";
import loggingMessages from "../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../utils/requests/requestUtils.js";
import handleRequest from "../../../utils/requests/handleRequest.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const createMany = (Model) => {
  return handleAsync(async (req, res, next) => {
    // Define logging messages
    const { crud } = loggingMessages;

    // Check required variables are defined
    checkVarsSet({ Model, crud });

    // Handle request and return validated data
    const validatedData = await handleRequest(req, res, next);

    // Create the items using the validated data
    const flattenedData = validatedData.users.map((datum) => ({
      ...datum,
    }));
    const results = await Model.insertMany(flattenedData);

    // Return the result / error
    return !results || results.length === 0
      ? requestUtils.resultNotFound(res, crud.errors.created)
      : requestUtils.resultFound(res, crud.success.created, results);
  });
};

export default createMany;
