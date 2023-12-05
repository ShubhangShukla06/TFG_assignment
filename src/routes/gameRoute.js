const route = require("express").Router();
const {
  createGame,
  getGameByPlayerEmail,
  updateGameByPlayerEmail,
  deleteGameByPlayerEmail,
} = require("../controllers/gameController");

route.post("/createGame", createGame);
route.get("/getGameByPlayerEmail", getGameByPlayerEmail);
route.put("/updateGameByPlayerEmail", updateGameByPlayerEmail);
route.delete("/deleteGameByPlayerEmail", deleteGameByPlayerEmail);

module.exports = route;