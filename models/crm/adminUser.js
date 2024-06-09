const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
});

// Define the User schema
const aquaAdminUserSchema = new mongoose.Schema(
  {
    id: { type: String },
    username: { type: String }, // Added required field for username
    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: [validator.isEmail, "Please enter email in correct format"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password should be at least 6 characters"],
      select: false,
    },
    alternativeEmail: {
      type: String,
      validate: [validator.isEmail, "Please enter email in correct format"],
    },
    role: {
      type: String,
      default: "user",
    },
    photo: {
      id: { type: String },
      secure_url: { type: String },
    },
    phoneNo: { type: Number },
    gstDetails: {
      gstEmail: { type: String },
      gstNo: { type: String },
      gstPhone: { type: Number },
      gstAddress: { type: String }, // Corrected field name from 'gstAddres' to 'gstAddress'
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to the product
        quantity: { type: Number, required: true },
      },
    ],
    orders: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // Reference to the order
        orderDate: { type: Date, default: Date.now },
      },
    ],
    wishes: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to the product
        addedDate: { type: Date, default: Date.now },
      },
    ],
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    addresses: [addressSchema], // Store multiple addresses as an array of address objects
  },
  { timestamps: true },
);

// Encrypt password before save - HOOKS
aquaAdminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Validate the password with the passed user password
aquaAdminUserSchema.methods.isValidatedPassword = async function (
  userSendPassword,
) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// Create and return JWT token
aquaAdminUserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "1d",
  });
};

// Generate forgot password token (string)
aquaAdminUserSchema.methods.getForgotPasswordToken = function () {
  // Generate a long and random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // Getting a hash - make sure to get a hash on the backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  // Time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes

  return forgotToken;
};

module.exports = mongoose.model("AquaAdminUser", aquaAdminUserSchema);
