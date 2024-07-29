import { checkSchema } from "express-validator";
import runValidators from "../../../requests/runValidators.js";
import validateMongoId from "../../functions/validateMongoID.js";
import validateUsername from "../../functions/userFunctions/username.js";
import validateEmail from "../../functions/userFunctions/email.js";
import validateAvatar from "../../functions/userFunctions/avatar.js";
import trimEscapeOptional from "../../../sanitisation/trimEscapeOptional.js";
import AppError from "../../../../../base-template/src/utils/errors/AppError.js";
import loggingMessages from "../../../logging/loggingMessages.js";

const messages = loggingMessages.crud.errors;

const validateUpdateUserById = checkSchema({
  ...validateMongoId,
  username: {
    ...trimEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateUsername]),
      },
    }),
    optional: { options: { nullable: true, checkFalsy: true } },
  },
  email: {
    ...trimEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateEmail]),
      },
    }),
    optional: { options: { nullable: true, checkFalsy: true } },
  },
  emailConfirm: {
    ...trimEscapeOptional({
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.email) {
            throw new AppError(messages.emailsDoNotMatch, 400); // Ensure this error message is defined
          }
          return runValidators(value, [validateEmail]);
        },
      },
    }),
    optional: { options: { nullable: true, checkFalsy: true } },
  },

  avatar: {
    ...trimEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateAvatar]),
      },
    }),
    optional: { options: { nullable: true, checkFalsy: true } },
  },
});

export default validateUpdateUserById;
