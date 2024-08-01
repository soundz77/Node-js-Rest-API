import TokenModel from "../../models/TokenModel.js";

const revokeRefreshToken = async (refreshToken) => {
  const result = await TokenModel.findOneAndUpdate(
    { token: refreshToken },
    { revoked: true },
    { new: true } // Return the updated document
  );

  // Check if the token was found and updated
  if (!result) {
    return { status: 404, message: "Refresh token not found" };
  }

  return { status: 200, message: "Refresh token has been revoked" };
};

export default revokeRefreshToken;
