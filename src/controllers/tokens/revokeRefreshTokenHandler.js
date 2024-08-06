import handleAsync from "express-async-handler";
import revokeRefreshToken from "../../utils/tokens/revokeRefreshToken.js";

const clientRevokeRefreshToken = handleAsync(async (req, res) => {
  try {
    const { userId } = req.params; // User ID from URL parameter

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const success = await revokeRefreshToken(userId);

    if (!success) {
      return res.status(500).json({ error: "Failed to revoke tokens" });
    }

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error revoking refresh tokens:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while revoking refresh tokens" });
  }
});

export default clientRevokeRefreshToken;
