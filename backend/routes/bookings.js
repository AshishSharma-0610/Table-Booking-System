const express = require('express');
const bookingController = require('../controllers/bookingController');
const validateBooking = require('../middleware/validateBooking');

const router = express.Router();

// POST /api/bookings - Create new booking
router.post('/', validateBooking, bookingController.createBooking);

// GET /api/bookings - Get all bookings
router.get('/', bookingController.getBookings);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;