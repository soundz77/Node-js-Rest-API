import validator from "validator";

// Helper function to split string on comma and trim each item
const stringsToArray = (string) => {
  return string.split(",").map((field) => validator.trim(field));
};

export default stringsToArray;
