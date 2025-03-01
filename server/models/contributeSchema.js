const mongoose = require('mongoose');

const contributeSchema = new mongoose.Schema({
    userId: String,
    quantity: Number,
    wasteType: String,
    amount: Number,
    status: { type: String, default: "pending" },
    collectorName: String,
    date: { type: Date, default: Date.now },
    updatedBy: String
});

module.exports = mongoose.model('contribute', contributeSchema);