import passport from "passport";
import issueJWT from "../JWT/issueJWT.js";

const handleAuthAndLogin = (req, res, next) => {
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

    req.login(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Login error", error: err });
      }

      try {
        // Generate JWT and set cookie
        const { authToken, refreshToken } = await issueJWT(res, user);

        if (!authToken || !refreshToken) {
          return res.status(500).json({ message: "Unable to issue token" });
        }

        // Set the access token in the `Authorization` header
        res.setHeader("Authorization", `Bearer ${authToken}`);

        // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ message: "Login successful" });
      } catch (error) {
        res.status(500).json({ message: "Token generation error", error });
      }
    });
  })(req, res, next);
};

export default handleAuthAndLogin;
