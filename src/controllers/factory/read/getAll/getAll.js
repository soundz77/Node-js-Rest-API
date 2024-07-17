import handleAsync from "express-async-handler";
import loggingMessages from "../../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../../utils/requests/requestUtils.js";
import checkVarsSet from "../../../../../base-template/src/utils/validation/checkVarsSet.js";
import buildQuery from "../../../../utils/requests/buildQuery/buildQuery.js";

const getAll = (Model) => {
  return handleAsync(async (req, res) => {
    // Define logging messages
    const { crud } = loggingMessages;

    // Check required variables are defined
    checkVarsSet({ Model, crud });

    // Extract filters from query parameters
    const filters = { query: req.query };

    // Build the query by applying any filters
    // Returns the query and a message if filters were applied/invalid
    const queryObj = buildQuery(Model, filters.query);
    const { query, messages } = queryObj;
    // Execute the query
    const result = await query.exec();

    // Send response with document or error message
    return !result.length > 0
      ? requestUtils.resultNotFound(res, crud.errors.get)
      : requestUtils.resultFound(res, messages, result);
  });
};

export default getAll;
