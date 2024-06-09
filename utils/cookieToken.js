const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  // Ensure COOKIE_TIME is a valid number
  const cookieTime = parseInt(process.env.COOKIE_TIME);
  if (isNaN(cookieTime)) {
    throw new Error("COOKIE_TIME environment variable is not a valid number");
  }

  const options = {
    expires: new Date(Date.now() + cookieTime * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.password = undefined;
  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
