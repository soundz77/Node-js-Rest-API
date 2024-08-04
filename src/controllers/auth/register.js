import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel.js";
import passport from "passport";

const register = asyncHandler(async (req, res) => {
  const { username, email, emailConfirm, password, passwordConfirm } = req.body;

  if (email !== emailConfirm) {
    return res
      .status(400)
      .json({ message: "Email confirmation does not match" });
  }
  if (password !== passwordConfirm) {
    return res
      .status(400)
      .json({ message: "Password confirmation does not match" });
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
  User.register(newUser, password, (error) => {
    if (error) {
      console.error("Error during user registration:", error);
      return res.status(500).json({ message: "Unable to register", error });
    }

    // Use passport to authenticate the newly registered user
    passport.authenticate(
      "local",
      { usernameField: "email" },
      (error, user, info) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Authentication error", error });
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

          try {
            // Generate token
            const { id, username, avatar, email } = user;
            const payload = { id, username, avatar, email };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
              expiresIn: "15m",
            });
            const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
              expiresIn: "7d",
            });

            // Set token in the `Authorization` header
            res.setHeader("Authorization", `Bearer ${token}`);

            // Set refresh token in HTTP-only cookie
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "None",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ message: "Registration successful" });
          } catch (error) {
            res.status(500).json({ message: "Token generation error", error });
          }
        });
      }
    )(req, res);
  });
});

export default register;
