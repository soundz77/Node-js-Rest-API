import revokeRefreshToken from "./revokeRefreshToken.js";

const revokeRefresh = async (req, res, next) => {
  try {
    // Extract the refresh token from the cookies
    const refreshToken = req.cookies.refreshToken;

    // Check if the refresh token is provided
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    // Call the function to revoke the refresh token
    const { status, message } = await revokeRefreshToken(refreshToken);

    // Handle the response from revokeRefreshToken
    if (status !== 200) {
      return res.status(status).json({ error: "Unable to refresh token" });
    }

    res.status(200).json({ message });
    next();
  } catch (error) {
    console.error("Error revoking refresh token:", error);
    res
      .status(500)
      .json({ error: "An error occurred while revoking the refresh token" });
  }
};

export default revokeRefresh;
