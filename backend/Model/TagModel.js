const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String },
    description: { type: String },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
