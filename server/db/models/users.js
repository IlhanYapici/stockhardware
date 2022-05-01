const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../../lib/utils");

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalcode: { type: Number, required: true },
    country: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await hashPassword(this.password);
});

/**
 *
 * @param {string} bodyPassword - password from the request body
 * @returns {boolean} Returns true if the password matches the hashed password, else returns false
 */
userSchema.methods.matchPassword = async function (bodyPassword) {
  return await bcrypt.compare(bodyPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
