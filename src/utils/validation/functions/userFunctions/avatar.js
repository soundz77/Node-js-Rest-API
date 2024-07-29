// MISSING: detailed validation once requirements are clear

const validateAvatar = (value) => {
  return value && typeof (value === "string") && ["1.png", "2.png", "3.png"].includes(value);
};

export default validateAvatar;
