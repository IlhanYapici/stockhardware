const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const gpuSchema = new Schema(
  {
    reference: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    architecture: { type: String, required: true },
    node: { type: String, required: true },
    bus: { type: String, required: true },
    mem_size: { type: String, required: true },
    mem_type: { type: String, required: true },
    mem_interface: { type: String, required: true },
    freq_idle: { type: String, required: true },
    freq_boost: { type: String, required: true },
    bandwidth: { type: String, required: true },
    cuda_cores: { type: Number, required: true },
    tensor_cores: { type: Number, required: true },
    rt_cores: { type: Number, required: true, default: "0" },
    tdp: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Gpu = mongoose.model("Gpu", gpuSchema);

module.exports = Gpu;
