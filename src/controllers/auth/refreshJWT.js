import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import TokenModel from "../../models/TokenModel.js";
import issueJWT from "./issueJWT.js";
import revokeRefreshToken from "./revokeRefreshToken.js";

const refreshJWT = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const tokenDoc = await TokenModel.findOne({
          token: refreshToken,
          revoked: false,
        });
        if (!tokenDoc) {
          return res.status(403).json({ message: "Refresh token revoked" });
        }

        const user = decoded;
        const { authToken, newRefreshToken } = await issueJWT(res, user); // returns an authToken and a refreshToken

        // Set new tokens

        // Revoke old refresh token
        await revokeRefreshToken(refreshToken);

        res.json({ message: "Token refreshed" });
      }
    );
  } catch (error) {
    console.error("Error refreshing access token", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default refreshJWT;
