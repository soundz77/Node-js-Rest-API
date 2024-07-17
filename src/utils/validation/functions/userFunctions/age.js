import userConfig from "../../../../config/userConfig.js";

const validateAge = (value) => {
  // Check if value exists and is a number
  if (value == null || isNaN(value)) {
    return false;
  }

  // Check whether the value is in range
  return (
    Number(value) >= userConfig.age.min && Number(value) <= userConfig.age.max
  );
};

export default validateAge;
