import validator from "validator";

const equalValues = (value1, value2) => {
  return !validator.equals(value1, value2);
};

export default equalValues;
