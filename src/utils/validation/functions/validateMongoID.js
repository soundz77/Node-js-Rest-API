import checkIsString from "./dataTypeFunctions/checkIsString.js";
import checkNotEmpty from "./checkNotEmpty.js";
import checkIsMongoId from "./checkIsMongoId.js";

const validateMongoId = (value) => {
  // Call individual validation functions and return false if any fails
  return checkIsString(value) && checkNotEmpty(value) && checkIsMongoId(value);
};

export default validateMongoId;
