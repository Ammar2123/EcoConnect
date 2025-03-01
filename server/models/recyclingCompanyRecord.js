const mongoose = require('mongoose');

const recycleSchema = new mongoose.Schema({
    userId: String,
    wasteType: String,
    quantity: Number,
    amount: Number,
    date: Date
});

module.exports = mongoose.model('recycle', recycleSchema);