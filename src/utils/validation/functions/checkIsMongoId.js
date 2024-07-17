import validator from "validator";

const checkIsMongoId = (value) => {
  return validator.isMongoId(value);
};

export default checkIsMongoId;
