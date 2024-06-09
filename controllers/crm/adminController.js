const AquaAdminUser = require("../../models/crm/adminUser");
const AquaEcomUser = require("../../models/user")
const BigPromise = require("../../middlewares/bigPromise");
const CustomError = require("../../utils/customError");
const cookieToken = require("../../utils/cookieToken");

// Signup Controller
exports.signup = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Email and password are required", 400));
  }

  // Uncomment this block if photo upload is required
  // if (!req.files) {
  //   return next(new CustomError("Photo is required for signup", 400));
  // }
  // let file = req.files.photo;
  // const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
  //   folder: "users",
  //   width: 150,
  //   crop: "scale",
  // });

  const user = await AquaAdminUser.create({
    email,
    password,
    // photo: {
    //   id: result.public_id,
    //   secure_url: result.secure_url
    // },
  });

  cookieToken(user, res);
});

// Login Controller
exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // Check for presence of email and password
  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }

  // Get user from DB
  const user = await AquaAdminUser.findOne({ email }).select("+password");

  // If user not found in DB
  if (!user) {
    return next(
      new CustomError("Email or password does not match or exist", 400),
    );
  }

  // Match the password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  // If password does not match
  if (!isPasswordCorrect) {
    return next(
      new CustomError("Email or password does not match or exist", 400),
    );
  }

  // If all goes good and we send the token
  cookieToken(user, res);
});

// Logout Controller
exports.logout = BigPromise(async (req, res, next) => {
  // Clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()), // Ensure this is a valid Date object
    httpOnly: true,
  });

  // Send JSON response for success
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});

// Get All Ecom Users Controller
exports.getAllEcomUsers = BigPromise(async (req, res, next) => {
  try {
    const users = await AquaEcomUser.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    res.json({ success: false, data: [] });
  }
});
