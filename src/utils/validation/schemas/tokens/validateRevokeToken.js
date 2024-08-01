import { checkSchema } from "express-validator";
import checkIsMongoId from "../../functions/checkIsMongoId.js";

const validateRevokeToken = checkSchema({
  id: {
    custom: {
      options: (value) => {
        if (!checkIsMongoId(value)) {
          throw new Error("Invalid MongoDB ObjectId");
        }
        return true;
      },
    },
    trim: true,
    escape: true,
  },
  revoked: {
    isIn: {
      options: [["true", "false"]],
      errorMessage: 'Revoked must be "true" or "false"',
    },
  },
});

export default validateRevokeToken;
