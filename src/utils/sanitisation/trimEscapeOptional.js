const trimEscapeOptional = (options) => {
  return {
    ...options, // an object of optional validators that can also be passed to this function
    trim: true,
    escape: true,
    optional: true,
  };
};

export default trimEscapeOptional;
