const ensureIsNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(403).send("Forbidden");
};

export default ensureIsNotAuthenticated;
