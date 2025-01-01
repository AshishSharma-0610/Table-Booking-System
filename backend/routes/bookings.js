// backend/routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking'); // Import the Booking model

const router = express.Router();

// POST route to create a new booking
router.post('/', async (req, res) => {
    const { name, contact, guests, date, time } = req.body;

    // Input validation
    if (!name || !contact || !guests || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for double booking (same date and time)
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
        return res.status(400).json({ error: 'Time slot already booked' });
    }

    // Create new booking
    try {
        const newBooking = new Booking({ name, contact, guests, date, time });
        await newBooking.save();
        res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET route to fetch all bookings (for availability check)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bookings' });
    }
});

// DELETE route to delete a booking by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking canceled' });
    } catch (error) {
        res.status(500).json({ error: 'Error canceling booking' });
    }
});

module.exports = router;
