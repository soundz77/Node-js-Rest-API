import TokenModel from "../../models/TokenModel.js";

// Function to clean up expired revoked tokens
const removeRevokedTokens = async () => {
  try {
    // Find and remove expired tokens that are revoked
    const result = await TokenModel.deleteMany({
      revoked: true, // Only consider revoked tokens
      expiresAt: { $lt: new Date() }, // Only tokens that are expired
    });

    console.log(`Cleaned up ${result.deletedCount} expired revoked tokens.`);
  } catch (error) {
    console.error("Error cleaning up expired revoked tokens:", error.message);
  }
};

/* Could be run automatically
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds  (add to .env)
setInterval(removeRevokedTokens, CLEANUP_INTERVAL); // add to app.js
*/

export default removeRevokedTokens;
