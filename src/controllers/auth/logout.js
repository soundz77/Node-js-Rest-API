const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    // Clear cookies for browser-based users
    /*
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
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
*/
    res.status(200).json({
      message: "You have been logged out",
    });
  });
};

export default logout;
