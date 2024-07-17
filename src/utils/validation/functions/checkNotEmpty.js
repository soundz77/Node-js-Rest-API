import validator from "validator";
// Function to check whether a value is empty
const checkNotEmpty = (value) => {
  return validator.isLength(value, { min: 1 });
};

export default checkNotEmpty;
