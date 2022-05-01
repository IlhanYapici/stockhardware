const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const cpuSchema = new Schema(
  {
    reference: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    architecture: { type: String, required: true },
    node: { type: String, required: true },
    socket: { type: String, required: true },
    freq_idle: { type: String, required: true },
    freq_boost: { type: String, required: true },
    cores: { type: Number, required: true, default: 0 },
    threads: { type: Number, required: true, default: 0 },
    cache: { type: String, required: true },
    computing: { type: String, required: true },
    chipsets: { type: [String], required: true },
    tdp: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Cpu = mongoose.model("Cpu", cpuSchema);

module.exports = Cpu;
