import validator from "validator";
import AppError from "../../../../base-template/src/utils/errors/AppError.js";
import loggingMessages from "../../logging/loggingMessages.js";

const messages = loggingMessages.validation;

const validateCreatedAt = (value) => {
  if (!validator.isISO8601(value)) {
    throw new AppError(`'createdAt' ${messages.format}`);
  }
  return value;
};

export default validateCreatedAt;
