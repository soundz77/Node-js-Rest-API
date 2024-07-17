const checkIsObject = (value) => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export default checkIsObject;
