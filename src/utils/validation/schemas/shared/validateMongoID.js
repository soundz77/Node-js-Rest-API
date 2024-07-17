import { checkSchema } from "express-validator";
import checkIsMongoId from "../../functions/checkIsMongoId.js";

const validateMongoId = checkSchema({
  id: {
    custom: {
      options: (value) => {
        if (!checkIsMongoId(value)) {
          return false;
        }
        return true;
      },
    },
    trim: true,
    escape: true,
  },
});

export default validateMongoId;
