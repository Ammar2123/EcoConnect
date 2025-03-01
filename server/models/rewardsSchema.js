const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    userId: String,
    points: Number,
    date: Date
});

module.exports = mongoose.model('reward', rewardSchema);