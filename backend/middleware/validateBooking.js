// Validation middleware for booking requests
const validateBooking = (req, res, next) => {
    const { name, contact, guests, date, time } = req.body;

    if (!name || !contact || !guests || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (guests < 1 || guests > 100) {
        return res.status(400).json({ error: 'Number of guests must be between 1 and 100' });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
        return res.status(400).json({ error: 'Invalid time format' });
    }

    // Validate date (must be future date)
    const bookingDate = new Date(date);
    if (bookingDate < new Date().setHours(0, 0, 0, 0)) {
        return res.status(400).json({ error: 'Booking date must be in the future' });
    }

    next();
};

module.exports = validateBooking;