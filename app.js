require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/userRoute");
const gameRoute = require("./src/routes/gameRoute");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { sequelizeObj } = require("./src/db/mysqlConnection");
const { mongoDBConnection } = require("./src/db/mongoConnection");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// set security headers
app.use(helmet());

// connect mongodb
mongoDBConnection();

// connect mysql
sequelizeObj
  .authenticate()
  .then(() => {
    console.log("Mysql connection has been established successfully");
  })
  .catch((err) => {
    console.error(`Unable to connect : ${err}`);
  });

app.use("/api/user/", userRoute);
app.use("/api/game/", gameRoute);

// handle not found routes
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.status
        ? error.message
        : ReasonPhrases.INTERNAL_SERVER_ERROR,
    },
  });
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));