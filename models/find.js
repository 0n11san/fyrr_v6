const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FindSchema = new Schema({
    mood: {
        type: String
    },
    date: { type: Date, default: Date.now },
});
const Find = mongoose.model("Find", FindSchema);

module.exports = Find;
