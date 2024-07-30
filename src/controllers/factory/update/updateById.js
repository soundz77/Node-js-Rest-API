import handleAsync from "express-async-handler";
import jwt from "jsonwebtoken";
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

    if (isNoChange) {
      return requestUtils.resultFound(res, "Nothing to update.");
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

      // Generate a new JWT if critical fields are updated
    const { username, email, avatar } = updatedDocument;
    const payload = { id, username, avatar, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Optionally, generate a new refresh token if needed
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Set the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

   
    // Successfully updated, return the result
    return requestUtils.resultFound(
      res,
      messages.success.updated,
      { user: updatedDocument, token }
    );
});
};

export default updateOne;
