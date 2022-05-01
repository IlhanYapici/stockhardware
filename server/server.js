require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Routes
const userRouter = require("./routes/users");
const gpuRouter = require("./routes/gpu");
const cpuRouter = require("./routes/cpu");
const loginRouter = require("./routes/login");

app.use(cors());
app.use(express.json());
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/gpu", gpuRouter);
app.use("/cpu", cpuRouter);

const db = require("./db/connection");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db.check();
});
