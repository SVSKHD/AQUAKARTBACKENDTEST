const User = require("../models/user");
const AquaAdminUser = require("../models/crm/adminUser");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }
  if (!token) {
    return next(new CustomError("Login first to access this page", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});


exports.isAdminLoggedIn =BigPromise(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token && req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login first to access this page",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await AquaAdminUser.findById(decoded.id);
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});


exports.customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("You are not allowed for this resouce", 403));
    }
    console.log(req.user.role);
    next();
  };
};

exports.customAdminRole = (...roles) => {
  return async (req, res, next) => {
    const adminUser = await AquaAdminUser.findById(req.user.id);
    if (!roles.includes(adminUser.role)) {
      return next(
        new CustomError("You are not allowed for this resource", 403),
      );
    }
    console.log(adminUser.role);
    next();
  };
};
