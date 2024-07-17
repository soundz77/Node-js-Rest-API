import validator from "validator";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";
import apiFeaturesConfig from "../../../config/apiFeaturesConfig.js";
import checkPermittedFields from "../functions/checkPermittedFields.js";

// Validation function for the sort field
const validateSort = (sortField, modelName) => {
  const config = apiFeaturesConfig.sort;
  const permittedFields = config[modelName]?.permittedFields;

  checkVarsSet(sortField, modelName, config, permittedFields);

  const sanitisedSortField = validator.escape(validator.trim(sortField));

  const isAlpha = validator.isAlpha(sanitisedSortField, config.sortLocale, {
    ignore: config.sortIgnore,
  });

  return isAlpha && checkPermittedFields(sanitisedSortField, permittedFields);
};

export default validateSort;
