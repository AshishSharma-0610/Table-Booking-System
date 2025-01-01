// backend/server.js
require('dotenv').config();  // Ensure dotenv is loaded
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import DB connection
const bookingRoutes = require('./routes/bookings'); // Import routes

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
