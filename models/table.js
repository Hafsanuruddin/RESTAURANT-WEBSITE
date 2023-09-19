const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true, // Ensure table numbers are unique
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false, // Initialize as not booked
    },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
