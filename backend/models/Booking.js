// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        guests: { type: Number, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
