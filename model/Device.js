const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        min: 6
    },
    userId: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    deviceName: {
        type: String,
        required: true,
        max: 255,
        min: 1
    }
    
});


module.exports = mongoose.model('Device', deviceSchema);