import handleAsync from "express-async-handler";
import revokeRefreshToken from "../../utils/JWT/revokeRefreshToken.js";

const clientRevokeRefreshToken = handleAsync(async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL parameter

    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      return res.status(400).json({ error: "RefreshToken is required." });
    }

    const updatedToken = revokeRefreshToken(id, refreshToken);

    if (!updatedToken) {
      return res.status(404).json({ error: "Token not found" });
    }

    return res
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
