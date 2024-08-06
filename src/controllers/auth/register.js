import asyncHandler from "express-async-handler";
import User from "../../models/UserModel.js";
import handleAuthAndLogin from "../auth/handleAuthAndLogin.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, emailConfirm, password, passwordConfirm } = req.body;

  // Perform basic validation
  if (!username || !email || !emailConfirm || !password || !passwordConfirm) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

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

  // Prepare the new user object
  const newUser = new User({
    username,
    email,
    emailConfirm,
    password,
    passwordConfirm,
    avatar: "1.png",
    role: "user",
  });

  // Register the user
  User.register(newUser, password, (error) => {
    if (error) {
      console.error("Error during user registration:", error);
      return res
        .status(500)
        .json({ message: error.message || "Unable to register", error });
    }

    // Use the common function to handle authentication and login
    handleAuthAndLogin(req, res);
  });
});

export default register;
