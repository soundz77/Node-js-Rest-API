import validator from "validator";
import userConfig from "../../../../config/userConfig.js";

const validateRole = (value) => {
  return value && validator.isIn(value, userConfig.roles);
};
export default validateRole;
