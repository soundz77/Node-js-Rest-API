import handleAsync from "express-async-handler";
import loggingMessages from ".././../../utils/logging/loggingMessages.js";
import requestUtils from "../../../utils/requests/requestUtils.js";
import handleRequest from "../../../utils/requests/handleRequest.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const updateAll = (Model) => {
  return handleAsync(async (req, res, next) => {
    const { crud } = loggingMessages;

    checkVarsSet({ Model, crud });

    // Handle request and return validated data
    const validatedData = await handleRequest(req, res, next);

    if (validatedData.length === 0) {
      return res.status(200).json({ message: "Unable to update." });
    }

    // Construct the update object
    const updateObject = { $set: validatedData };

    // Execute the update operation
    const results = await Model.updateMany(
      {}, // Update all documents that match an empty filter
      updateObject,
      {
        new: true, // return updated documents
        runValidators: true, // ensures validations are run
      }
    );

    // Return the result / error

    return !results || results.modifiedCount === 0
      ? requestUtils.resultNotFound(res, crud.errors.updated)
      : requestUtils.resultFound(res, crud.success.updated, results);
  });
};

export default updateAll;
