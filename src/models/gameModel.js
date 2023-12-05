const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player_name: {
        type: String,
        required: true
    },
    player_email: {
        type: String,
        required: true
    },
    game_name: {
        type: String,
        required: true
    },
    game_result: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('game_data', gameSchema);