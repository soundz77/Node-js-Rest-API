import TokenModel from "../../models/TokenModel.js";
import handleAsync from "express-async-handler";

const clientRevokeRefreshToken = handleAsync(async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL parameter

    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Find and update the token document for the given user ID
    const updatedToken = await TokenModel.findOneAndUpdate(
      { userId: id }, // Find token document by user ID
      { revoked: true }, // Set revoked to true
      { new: true } // Return the updated document
    );

    if (!updatedToken) {
      return res.status(404).json({ error: "Token not found" });
    }

    res
      .status(200)
      .json({ message: "Token revoked successfully", token: updatedToken });
  } catch (error) {
    console.error("Error revoking refresh token:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while revoking the refresh token" });
  }
});

export default clientRevokeRefreshToken;
