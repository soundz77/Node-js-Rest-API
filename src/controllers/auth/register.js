import asyncHandler from "express-async-handler";
import User from "../../models/UserModel.js";
import passport from "passport";

const register = asyncHandler(async (req, res) => {
  const { username, email, emailConfirm, password, passwordConfirm } = req.body;

  // Field validations
  if (email !== emailConfirm) {
    return res.status(400).json({ message: "Emails do not match" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const userData = {
    username,
    email,
    emailConfirm,
    password,
    passwordConfirm,
    avatar: "1.png",
    role: "user",
  };

  // Add required fields
  const newUser = new User(userData);

  // Attempt to register user
  User.register(newUser, password, (err) => {
    if (err) {
      console.error("Error during user registration:", err);
      return res
        .status(500)
        .json({ message: "Unable to register", error: err });
    }

    // Use passport to authenticate the newly registered user
    passport.authenticate(
      "local",
      { usernameField: "email" },
      (err, user, info) => {
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

        // Log the user in
        req.login(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "Login error", error: err });
          }
          return res
            .status(200)
            .json({ message: "Thanks for registering!", user });
        });
      }
    )(req, res);
  });
});

export default register;
