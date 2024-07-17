import { checkSchema } from "express-validator";
import runValidators from "../../../requests/runValidators.js";
import validateUsername from "../../functions/userFunctions/username.js";
import validateEmail from "../../functions/userFunctions/email.js";
import trimEscapeOptional from "../../../sanitisation/trimEscapeOptional.js";

const validateUpdateAll = checkSchema({
  username: trimEscapeOptional({
    custom: {
      options: (value) => runValidators(value, [validateUsername]),
    },
  }),
  email: trimEscapeOptional({
    custom: {
      options: (value) => runValidators(value, [validateEmail]),
    },
  }),

  // MISSING: email === emailConfirm
  emailConfirm: trimEscapeOptional({
    custom: {
      options: (value) => runValidators(value, [validateEmail]),
    },
  }),
});

export default validateUpdateAll;
