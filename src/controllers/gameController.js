const gameModel = require("../models/gameModel");

exports.createGame = async (req, res) => {
  try {
    const {
        player_name,
        player_email,
        game_name,
        game_result
    } = req.body;

    const playerExists = await gameModel.findOne({ player_email });

    if(playerExists) {
        return res.json({
            msg: 'Player email already exists',
            error: false,
            code: 200
        });
    }

    const result = await gameModel.create({
        player_name,
        player_email,
        game_name,
        game_result
    });

    return res.json({
        data: result,
        error: false,
        code: 200
    });

  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};

exports.getGameByPlayerEmail = async (req, res) => {
  try {
    const { player_email } = req.body;

    const result = await gameModel.findOne({ player_email });

    return res.json({
        data: result,
        error: false,
        code: 200
    });

  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};

exports.updateGameByPlayerEmail = async (req, res) => {
  try {
    const { player_email, player_name } = req.body;

    const result = await gameModel.findOneAndUpdate({ player_email }, { player_name }, { new: true });

    return res.json({
        data: result,
        error: false,
        code: 200
    });

  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};

exports.deleteGameByPlayerEmail = async (req, res) => {
  try {
    const { player_email } = req.body;

    const result = await gameModel.deleteOne({ player_email });

    return res.json({
        data: result,
        error: false,
        code: 200
    });

  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};
