const mongoose = require("mongoose");
const URL = process.env.DB_URL;

mongoose.connect(URL);

module.exports = {
  check: async () => {
    const connection = await mongoose.createConnection(URL).asPromise();
    connection.readyState == 1
      ? console.log("connected to database")
      : console.log("cant connect to database");
  },
};
