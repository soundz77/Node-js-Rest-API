import apiFeaturesConfig from "../../../config/apiFeaturesConfig.js";
import stringsToArray from "../../validation/functions/dataTypeFunctions/stringsToArray.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const validateLimitFields = (limitFields, modelName) => {
  checkVarsSet({ limitFields, modelName });

  // Convert comma-separated string into an array
  const fields = stringsToArray(limitFields.trim());

  const permittedFields = apiFeaturesConfig.limitFields[modelName].validFields;

  const invalidFields = fields.filter(
    (field) => !permittedFields.includes(field)
  );

  // Return false if any invalid fields exist
  return invalidFields.length === 0;
};

export default validateLimitFields;
