const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: String,
    checked: Boolean,
});

module.exports = mongoose.model("Item", itemSchema);