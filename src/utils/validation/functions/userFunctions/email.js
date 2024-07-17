import validator from "validator";

const validateEmail = (email) => {
  return !!email && validator.isEmail(email);
};

export default validateEmail;
