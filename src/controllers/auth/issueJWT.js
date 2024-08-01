import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import TokenModel from "../../models/TokenModel.js";

// Requires a user obj and the res obj
// Generates and returns an auth token (token) and a refresh token (refreshToken(

const issueJWT = asyncHandler(async (res, user) => {
  const { id, username, avatar, email } = user;
  const payload = { id, username, avatar, email };

  // Generate tokens
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  try {
    // Create a refresh token document
    const refreshTokenDocument = new TokenModel({
      userId: id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    // Save token to DB
    await refreshTokenDocument.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
  return { authToken, refreshToken };
});

export default issueJWT;
