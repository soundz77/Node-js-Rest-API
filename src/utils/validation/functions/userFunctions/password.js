import userConfig from "../../../../config/userConfig.js";

const validatePassword = (password) => {
  // At least 8 characters, one digit, one lowercase letter, one uppercase letter,
  // and one special character:  !@#$%^&*()_+-=[]{};':"\|,.<>/?:
  // Prevent repeated characters/character blocks of three or more in a row (aaaa, bbb, 111, 112233 )

  const minLength = password.length >= userConfig.password.minLength;
  const pwdRegex = userConfig.password.regex.test(password);
  // const noRepeats = userConfig.password.noRepeatsRegex.test(password);

  return minLength && pwdRegex; //  && noRepeats;
};

export default validatePassword;
