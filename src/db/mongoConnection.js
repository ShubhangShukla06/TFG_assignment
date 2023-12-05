const mongoose = require("mongoose");

exports.mongoDBConnection = async () => {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  mongoose.set("debug", true); // mongodb logs
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongodb connection has been established successfully");
  });
};
