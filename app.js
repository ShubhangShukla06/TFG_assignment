require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

// handle not found routes
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
});

// middleware for catch error
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
