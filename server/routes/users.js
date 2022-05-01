const express = require("express");
const Users = require("../db/models/users");
const { readToken, readHeaders } = require("../lib/utils");
const ObjectId = require("mongodb").ObjectId;

// Instance of express router.
// Take control of requests starting with path "/users"
const userRouter = express.Router();

// Middleware to get user by id from database
userRouter.get("/:id", (req, res) => {
  const bearerToken = readToken(readHeaders(req.headers));
  const reqId =
    req.params.id.length === 24 ? req.params.id : readToken(req.params.id);
  // console.log({
  //   Bearer: bearerToken,
  //   RequestId: reqId,
  //   idMatched: reqId === bearerToken.id,
  //   isAdmin: bearerToken.isAdmin,
  // });
  if (!bearerToken || new Date(bearerToken.exp) > Date.now()) {
    console.log("No token or token expired");
    return res.status(401).send("Unauthorized");
  }
  if (!bearerToken.isAdmin && bearerToken.id !== reqId) {
    console.log("Not admin or id mismatch");
    return res.status(401).send("Unauthorized");
  }
  try {
    Users.findOne({ _id: ObjectId(reqId) }, (err, user) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to update user by id from database
userRouter.put("/:id", (req, res) => {
  const bearerToken = readToken(readHeaders(req.headers));
  const reqId =
    req.params.id.length === 24 ? req.params.id : readToken(req.params.id);
  if (!bearerToken || new Date(bearerToken.exp) > Date.now()) {
    return res.status(401).send({ message: "Unauthorized - Token expired" });
  }
  if (!bearerToken.isAdmin && bearerToken.id !== reqId) {
    return res
      .status(401)
      .send({ message: "Unauthorized - You don't have permission" });
  }
  try {
    Users.findOneAndUpdate({ _id: ObjectId(reqId) }, req.body, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to delete user by id from database
userRouter.delete("/:id", (req, response) => {
  const bearerToken = readToken(readHeaders(req.headers));
  const reqId =
    req.params.id.length === 24 ? req.params.id : readToken(req.params.id);
  if (!bearerToken || new Date(bearerToken.exp) > Date.now()) {
    return res.status(401).send("Unauthorized");
  }
  if (!bearerToken.isAdmin && bearerToken.id !== reqId) {
    return res.status(401).send("Unauthorized");
  }
  try {
    Users.findOneAndDelete({ _id: ObjectId(reqId) }, (err, user) => {
      if (err) {
        response.status(404).send(err);
      } else {
        response.status(204).send(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to get all users from database
userRouter.get("/", (req, res) => {
  const bearerToken = readToken(readHeaders(req.headers));
  if (!bearerToken || new Date(bearerToken.exp) > Date.now())
    return res.status(401).send("Unauthorized");
  if (!bearerToken.isAdmin) return res.status(401).send("Unauthorized");
  try {
    Users.find({}, (err, users) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(users);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to add user to database
userRouter.post("/", async (req, response) => {
  try {
    Users.create(req.body, (err, user) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.status(201).send(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = userRouter;
