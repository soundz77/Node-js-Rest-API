import handleAsync from "express-async-handler";
import loggingMessages from "../../../utils/logging/loggingMessages.js";
import requestUtils from "../../../utils/requests/requestUtils.js";
import handleRequest from "../../../utils/requests/handleRequest.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const updateOne = (Model) => {
  return handleAsync(async (req, res, next) => {
    const messages = loggingMessages.crud;
    checkVarsSet({ Model, messages });

    // Handle request and return validated data
    const validatedData = await handleRequest(req, res, next);

    const id = req.params.id; // MISSING: validation

    // Retrieve the original document
    const originalDocument = await Model.findById(id);
    if (!originalDocument) {
      return requestUtils.resultNotFound(res, messages.errors.notFound);
    }

    // Check if any field in validatedData is already equal to the original value
    const isNoChange = Object.keys(validatedData).every(
      (key) => originalDocument[key] === validatedData[key]
    );

    // MISSING: This returns a 404. Change to 200 (as also sends an "error" message) or 204 - no content
    if (isNoChange) {
      return requestUtils.resultNotFound(res, "No need to update. ");
    }

    // Update the document
    const updatedDocument = await Model.findByIdAndUpdate(id, validatedData, {
      new: true, // return updated document
      runValidators: true, // ensures validations are run
    });

    // If no document found, handle it appropriately
    if (!updatedDocument) {
      return requestUtils.resultNotFound(res, messages.errors.updated);
    }

    // Successfully updated, return the result
    return requestUtils.resultFound(
      res,
      messages.success.updated,
      updatedDocument
    );
  });
};

export default updateOne;
