import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import TokenModel from "../../models/TokenModel.js";
import issueJWT from "./issueJWT.js";
import revokeRefreshToken from "./revokeRefreshToken.js";

const refreshJWT = asyncHandler(async (req, res) => {
  if (!req.cookies?.refreshToken) {
    console.log("Refresh token not found");
    return { authToken: null, refreshToken: null };
  }

  const refreshToken = req.cookies.refreshToken;

  // Validate refresh token
  try {
    // Verify refresh token

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check token exists and has not been revoked
    const tokenDoc = await TokenModel.findOne({
      token: refreshToken,
      revoked: false,
    });

    if (!tokenDoc) {
      console.log("Refresh token revoked");
      return { authToken: null, refreshToken: null };
    }

    // Assume refresh Token is valid, so issue new tokens
    const user = decoded;
    const { authToken, newRefreshToken } = await issueJWT(res, user);

    // If new tokens have been issued, revoke old refresh token

    if (!authToken || !newRefreshToken) {
      console.log("Unable to issue new tokens.");
      return { authToken: null, refreshToken: null };
    }

    const revoked = await revokeRefreshToken(refreshToken);

    if (!revoked) {
      console.log("Unable to revoke refresh token");
      return { authToken: null, refreshToken: null };
    }

    // Return new (refreshed) tokens
    return { authToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { authToken: null, refreshToken: null };
  }
});

export default refreshJWT;
