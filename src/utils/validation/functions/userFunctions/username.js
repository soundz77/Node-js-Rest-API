import userConfig from "../../../../config/userConfig.js";

const validateUsername = (username) => {
  return userConfig.usernameRegex.test(username);
};

export default validateUsername;
