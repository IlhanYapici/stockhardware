const express = require("express");
const gpu = require("../db/models/gpu");
const ObjectId = require("mongodb").ObjectId;

// Instance of express router.
// Take control of requests starting with path "/gpu"
const gpuRouter = express.Router();

// Middleware to get gpu by id from database
gpuRouter.get("/:id", (req, res) => {
  try {
    gpu.findOne({ _id: ObjectId(req.params.id) }, (err, gpu) => {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).send(gpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to update gpu by id from database
gpuRouter.put("/:id", (req, response) => {
  try {
    gpu.findOneAndUpdate({ _id: ObjectId(req.params.id) }, (err, gpu) => {
      if (err) {
        console.error(err);
        response.send(err);
      } else {
        response.status(200).send(gpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to delete gpu by id from database
gpuRouter.delete("/:id", (req, response) => {
  try {
    gpu.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, gpu) => {
      if (err) {
        console.error(err);
        response.status(404).send(err);
      } else {
        response.status(204).send(gpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to add gpu to database
gpuRouter.post("/", (req, response) => {
  try {
    gpu.create(req.body, (err, gpu) => {
      if (err) {
        console.error(err);
        response.status(400).send(err);
      } else {
        response.status(201).send(gpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to get all gpu from database
gpuRouter.get("/", (req, res) => {
  try {
    gpu.find({}, (err, gpu) => {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).send(gpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = gpuRouter;
