const mongoose = require('mongoose');

const referSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: String,
        required: true,
        max: 15,
        min: 10
    },
    name: {
        type: String,
        required: true,
        max: 25,
        min: 5
    },
    course: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    status: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Refer', referSchema);