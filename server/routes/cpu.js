const express = require("express");
const cpu = require("../db/models/cpu");
const ObjectId = require("mongodb").ObjectId;

// Instance of express router.
// Take control of requests starting with path "/cpu"
const cpuRouter = express.Router();

// Middleware to get cpu by id from database
cpuRouter.get("/:id", (req, res) => {
  try {
    cpu.findOne({ _id: ObjectId(req.params.id) }, (err, cpu) => {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).send(cpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to update cpu by id from database
cpuRouter.put("/:id", (req, response) => {
  try {
    cpu.findOneAndUpdate({ _id: ObjectId(req.params.id) }, (err, cpu) => {
      if (err) {
        console.error(err);
        response.send(err);
      } else {
        response.status(200).send(cpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to delete cpu by id from database
cpuRouter.delete("/:id", (req, response) => {
  try {
    cpu.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, cpu) => {
      if (err) {
        console.error(err);
        response.status(404).send(err);
      } else {
        response.status(204).send(cpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to add cpu to database
cpuRouter.post("/", (req, response) => {
  try {
    cpu.create(req.body, (err, cpu) => {
      if (err) {
        console.error(err);
        response.status(400).send(err);
      } else {
        response.status(201).send(cpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// Middleware to get all cpu from database
cpuRouter.get("/", (req, res) => {
  try {
    cpu.find({}, (err, cpu) => {
      if (err) {
        console.error(err);
        res.status(404).send(err);
      } else {
        res.status(200).send(cpu);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = cpuRouter;
