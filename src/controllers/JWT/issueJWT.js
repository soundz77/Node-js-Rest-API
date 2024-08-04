import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import TokenModel from "../../models/TokenModel.js";

// Requires a user obj and the res obj
// Generates an authToken and a refreshToken. Returns an obj: { authToken, refreshToken }

const issueJWT = asyncHandler(async (res, user) => {
  const { id, username, avatar, email } = user;
  const payload = { id, username, avatar, email };

  // Check if payload has required fields
  if (!payload.id || !payload.username || !payload.avatar || !payload.email) {
    return { authToken: null, refreshToken: null };
  }

  // Generate tokens
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  try {
    // Save refresh token to DB
    const refreshTokenDocument = new TokenModel({
      userId: id, // Store the userId, but do not use it as _id
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });

    const savedToken = await refreshTokenDocument.save();

    if (!savedToken) {
      return { authToken: null, refreshToken: null };
    }

    return { authToken, refreshToken };
  } catch (error) {
    console.error("Error issuing JWT:", error);
    res.status(500).json({ message: error.message });
  }
});

export default issueJWT;
