const Booking = require('../models/Booking');

// Controller functions for booking operations
const bookingController = {
    // Create new booking
    createBooking: async (req, res) => {
        try {
            const { name, contact, guests, date, time } = req.body;

            // Check for existing booking
            const existingBooking = await Booking.findOne({ date, time });
            if (existingBooking) {
                return res.status(400).json({ error: 'Time slot already booked' });
            }

            const newBooking = new Booking({ name, contact, guests, date, time });
            await newBooking.save();

            res.status(201).json({
                message: 'Booking confirmed',
                booking: newBooking
            });
        } catch (error) {
            res.status(500).json({ error: 'Error creating booking' });
        }
    },

    // Get all bookings
    getBookings: async (req, res) => {
        try {
            const bookings = await Booking.find()
                .sort({ date: 1, time: 1 });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching bookings' });
        }
    },

    // Delete booking
    deleteBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await Booking.findByIdAndDelete(id);
            
            if (!booking) {
                return res.status(404).json({ error: 'Booking not found' });
            }

            res.json({ message: 'Booking canceled successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error canceling booking' });
        }
    }
};

module.exports = bookingController;