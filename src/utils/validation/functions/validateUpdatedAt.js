import validator from "validator";
import AppError from "../../../../base-template/src/utils/errors/AppError.js";
import loggingMessages from "../../logging/loggingMessages.js";

const messages = loggingMessages.validation;

const validateUpdatedAt = (value) => {
  if (!validator.isISO8601(value)) {
    throw new AppError(`'updatedAt' ${messages.format}`);
  }
  return;
};

export default validateUpdatedAt;
