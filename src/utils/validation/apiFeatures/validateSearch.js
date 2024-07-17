import validator from "validator";
import loggingMessages from "../../logging/loggingMessages.js";
import apiFeaturesConfig from "../../../config/apiFeaturesConfig.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";
import validateCreatedAt from "../functions/validateCreatedAt.js";
import validateUpdatedAt from "../functions/validateUpdatedAt.js";
import validateAge from "../functions/userFunctions/age.js";
import validateEmail from "../functions/userFunctions/email.js";
import validateRole from "../functions/userFunctions/role.js";
import validateUsername from "../functions/userFunctions/username.js";

const validateSearchTerm = (searchField, searchTerm) => {
  const searchFieldFunctions = {
    username: (searchTerm) => validateUsername(searchTerm),
    age: (searchTerm) => validateAge(searchTerm),
    createdAt: (searchTerm) => validateCreatedAt(searchTerm),
    updatedAt: (searchTerm) => validateUpdatedAt(searchTerm),
    email: (searchTerm) => validateEmail(searchTerm),
    role: (searchTerm) => validateRole(searchTerm),
  };

  // Return false if no function is found
  const validator = searchFieldFunctions[searchField];
  if (!validator) {
    return false;
  }

  // Otherwise return the result of the function (boolean)
  const result = validator(searchTerm);
  return result;
};

const validateSearchField = (searchField, acceptedSearchFields) => {
  const result = validator.isIn(searchField, acceptedSearchFields);
  return result;
};

const validateSearch = (searchField, searchTerm) => {
  const messages = loggingMessages.apiFeatures.search.errors;
  const errorMessages = loggingMessages.crud.errors;
  const acceptedSearchFields = apiFeaturesConfig.search.searchFields.all;

  checkVarsSet({
    searchField,
    searchTerm,
    messages,
    errorMessages,
    acceptedSearchFields,
  });

  const validSearchTerm = validateSearchTerm(searchField, searchTerm);
  const validSearchField = validateSearchField(
    searchField,
    acceptedSearchFields
  );

  return validSearchField && validSearchTerm;
};

export default validateSearch;
