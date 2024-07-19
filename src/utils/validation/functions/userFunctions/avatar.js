// MISSING: detailed validation once requirements are clear

const validateAvatar = (value) => {
  return value && typeof (value === "string");
};

export default validateAvatar;
