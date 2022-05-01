const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    throw new Error(e);
  }
};

const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
};

const readToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    return null;
  }
};

const readHeaders = (headers) => {
  const bearer = headers["authorization"] || headers["Authorization"];
  return bearer ? bearer.split(" ")[1] : null;
};

module.exports = {
  hashPassword,
  generateToken,
  readToken,
  readHeaders,
};
