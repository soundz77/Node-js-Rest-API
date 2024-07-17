import handleAsync from "express-async-handler";
import loggingMessages from "../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../utils/requests/requestUtils.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const deleteAll = (Model) => {
  return handleAsync(async (req, res) => {
    const { crud } = loggingMessages;

    checkVarsSet({ Model, crud });

    const results = await Model.deleteMany();

    // Return the result / error
    return !results || results.deletedCount === 0
      ? requestUtils.resultNotFound(res, crud.errors.deleted)
      : requestUtils.resultFound(res, crud.success.deleted, results);
  });
};

export default deleteAll;
