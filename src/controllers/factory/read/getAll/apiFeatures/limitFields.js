import validateLimitFields from "../../../../../utils/validation/apiFeatures/validateLimitFields.js";
import checkVarsSet from "../../../../../../base-template/src/utils/validation/checkVarsSet.js";

const limitFields = (query, limitFields, modelName) => {
  checkVarsSet(limitFields);

  const validatedFields = validateLimitFields(limitFields, modelName);
  return !validatedFields
    ? { query, messages: "Invalid limitFields filter not applied." }
    : {
        query: query.select(limitFields),
        messages: "LimitFields filter applied. ",
      };
};

export default limitFields;
