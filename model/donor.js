const mongoose = require("mongoose");
//o- is universal donor
const schema = new mongoose.Schema({
    name: String,
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    state: String,
    district: String,
    phone: String
})

const donorModel = mongoose.model("donorData", schema);

module.exports = donorModel;