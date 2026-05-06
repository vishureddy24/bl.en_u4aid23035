const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
    ID: {type: String, required: true},
    MechanicHours: {type: Number, required: true}
});

module.exports = mongoose.model('Depot', depotSchema);