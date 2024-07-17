import deepFreeze from "../utils/sanitisation/deepFreeze.js";

const userConfig = {
  roles: ["user", "admin"],
  defaultRole: "user",
  age: {
    min: 16,
    max: 120,
  },
  //  Allow alphanumeric characters (letters and numbers), underscores (_) and hyphens (-). and that is between 3 and 16 characters.
  usernameRegex: /^[a-zA-Z0-9_-]{3,16}$/,

  password: {
    // At least 8 characters, one digit, one lowercase letter, one uppercase letter,
    // and one special character:  !@#$%^&*()_+-=[]{};':"\|,.<>/?:
    // Prevent repeated characters/character blocks of three or more in a row (aaaa, bbb, 111, 112233 )
    regex:
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
    minLength: 8,
    noRepeatsRegex: /([\w])\1{2,}/,
  },
};

deepFreeze(userConfig);

export default userConfig;
