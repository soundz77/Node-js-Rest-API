// Function to check for empty req.body, presence of req.params or req.query
const requestUtils = {
  checkRequestErrors: (req) => {
    return !Object.keys(req.body).length &&
      Object.keys(req.params).length &&
      Object.keys(req.query).length
      ? "Invalid parameters sent with request"
      : null;
  },

  // Function to check for validation errors
  hasValidationErrors: (req, res, result) => {
    if (result.errors && result.errors.length > 0) {
      const errorMsg = result.errors[0].msg;
      const path = result.errors[0].path;
      const location = result.errors[0].location;
      const error = `${errorMsg} for ${path} in ${location}`;
      return res.status(400).json({ error });
    }
  },

  resultNotFound: (res, message) => {
    return res.status(404).json({
      status: "fail",
      message,
    });
  },

  resultFound: (res, message, data) => {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  },
};

export default requestUtils;
