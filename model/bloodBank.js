const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bbid: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bloodQty: {
        type: Object,
        default: {
            "A+": 0,
            "A-": 0,
            "AB+": 0,
            "AB-": 0,
            "B+": 0,
            "B-": 0,
            "O+": 0,
            "O-": 0
        },
        required: true
    }

});

const bloodBank = mongoose.model("Blood Bank Data", dataSchema);

module.exports = bloodBank;