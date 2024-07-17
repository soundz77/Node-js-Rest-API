import validator from "validator";

// MISSING: detailed validation once requirements are clear

const validateAvatar = (value) => {
  return value && validator.isStr(value);
};

export default validateAvatar;
