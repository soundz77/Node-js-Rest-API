import { checkExact, checkSchema } from "express-validator";
import runValidators from "../../../requests/runValidators.js";
import validateUsername from "../../functions/userFunctions/username.js";
import validateEmail from "../../functions/userFunctions/email.js";
// import validateEmailConfirm from "../../functions/userFunctions/emailConfirm.js";
import validatePassword from "../../functions/userFunctions/password.js";
// import validatePasswordConfirm from "../../functions/userFunctions/passwordConfirm.js";
import trimAndEscapeOptional from "../../../sanitisation/trimEscapeOptional.js";

const validateCreateMany = checkExact(
  checkSchema({
    users: {
      exists: true,
      isArray: true,
    },
    "*.username": trimAndEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateUsername]),
      },
    }),
    "*.email": trimAndEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateEmail]),
      },
    }),
    "*.emailConfirm": trimAndEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validateEmail]),
      },
    }),
    "*.password": trimAndEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validatePassword]),
      },
    }),
    // MISSING: Check passwords are the same
    "*.passwordConfirm": trimAndEscapeOptional({
      custom: {
        options: (value) => runValidators(value, [validatePassword]),
      },
    }),
  })
);

export default validateCreateMany;
