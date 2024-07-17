import handleAsync from "express-async-handler";
import loggingMessages from "../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../utils/requests/requestUtils.js";
import handleRequest from "../../../utils/requests/handleRequest.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const deleteById = (Model) => {
  return handleAsync(async (req, res, next) => {
    // Define logging messages
    const { crud } = loggingMessages;
    // Check required variables are defined
    checkVarsSet({ crud });

    // handle request and return validated body
    const { id } = await handleRequest(req, res, next);

    // Fetch document
    const document = await Model.findByIdAndDelete(id);

    // Log the request and return the result / error
    return !document
      ? requestUtils.resultNotFound(res, crud.errors.deleted)
      : requestUtils.resultFound(res, crud.success.deleted);
  });
};

export default deleteById;
