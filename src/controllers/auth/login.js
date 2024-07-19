import passport from "passport";

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Authentication error", error: err });
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", error: info });
    }
    req.login(user, (err) => {
      return err
        ? res.status(500).json({ message: "Login error", error: err })
        : res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

export default login;
