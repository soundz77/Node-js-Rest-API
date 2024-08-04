import TokenModel from "../../models/TokenModel.js";

// Attempts to set revoked to true and returns true/false
const revokeRefreshToken = async (userId, refreshToken) => {
  if (!userId || !refreshToken) {
    console.error("Missing userId or refreshToken");
    return false;
  }

  try {
    // Find the token document by token and userId, and update the revoked field
    const updatedToken = await TokenModel.findOneAndUpdate(
      { token: refreshToken, userId: userId }, // Query by token and userId
      { revoked: true }, // Set revoked to true
      { new: true } // Return the updated document
    );

    // Return a boolean indicating whether the token was revoked
    return updatedToken ? updatedToken.revoked : false;
  } catch (error) {
    console.error(`Error revoking refresh token: ${error.message}`);
    return false;
  }
};

export default revokeRefreshToken;
