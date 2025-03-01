const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    userId: String,
    copunCode: String,
    status: String,
    expiry: Date,
});

module.exports = mongoose.model('offer', offerSchema);