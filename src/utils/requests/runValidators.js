const runValidators = (value, validators) => {
  validators.forEach((validator) => {
    if (!validator(value)) {
      return false;
    }
  });
  return true;
};

export default runValidators;
