const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    TaskID: {type: String, required: true},
    Duration: {type: Number, required: true},
    Impact: {type: Number, required: true},

});

module.exports = mongoose.model('Vehicle', vehicleSchema);