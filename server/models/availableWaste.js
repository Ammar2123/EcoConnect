const mongoose = require('mongoose');

const availableWasteSchema = new mongoose.Schema({
    wasteType: String,
    quantity: String,
    date: Date,
});

module.exports = mongoose.model('availableWaste', availableWasteSchema);