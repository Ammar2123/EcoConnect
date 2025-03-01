const mongoose = require('mongoose');

const collectorSchema = new mongoose.Schema({
    userName: String,
    Name: String,
    pass: String,
    email: String,
    phone: String,
    aadharNo: String,
    aadharPhoto: String,
    panNo: String,
    panPhoto: String,
    address: String,
    status: String,
    reward: Number
});

module.exports = mongoose.model('collector', collectorSchema);