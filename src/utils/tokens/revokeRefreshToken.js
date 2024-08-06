import TokenModel from "../../models/TokenModel.js";

// Attempts to set revoked to true for all tokens associated with the user
const revokeRefreshToken = async (userId) => {
  if (!userId) {
    console.error("Missing userId");
    return false;
  }

  try {
    // Update all tokens associated with the user to revoked
    const result = await TokenModel.updateMany(
      { revoked: false, userId: userId }, // Query to match tokens
      { $set: { revoked: true } } // Set revoked to true
    );

    // Return true if at least one token was modified
    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`Error revoking refresh tokens: ${error.message}`);
    return false;
  }
};

export default revokeRefreshToken;
