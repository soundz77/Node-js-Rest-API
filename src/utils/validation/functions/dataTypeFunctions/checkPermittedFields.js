import validator from "validator";

// Helper function to check if a field is permitted
const checkPermittedFields = (field, permittedFields) => {
  return validator.isIn(field, permittedFields);
};

export default checkPermittedFields;
