const express = require("express");
const { authUser } = require("../lib/authentication");

const loginRouter = express.Router();

loginRouter.route("/").post(authUser);

module.exports = loginRouter;
