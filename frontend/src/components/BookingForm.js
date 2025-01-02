"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Calendar from './Calendar';
import TimeSlots from './TimeSlots';
import InputField from './InputField';
import SuccessMessage from './SuccessMessage';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        guests: '',
        date: '',
        time: ''
    });
    const [bookedSlots, setBookedSlots] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/bookings');
            setBookedSlots(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateSelect = (date) => {
        setFormData({ ...formData, date: format(date, 'yyyy-MM-dd') });
    };

    const handleTimeSelect = (time) => {
        setFormData({ ...formData, time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/bookings', formData);
            setMessage('Booking confirmed!');
            setMessageType('success');
            setShowSummary(true);
            fetchBookings(); // Refresh bookings list
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
            setMessageType('error');
        }
    };

    if (showSummary) {
        return (
            <motion.div 
                className="booking-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2>Booking Confirmed!</h2>
                <div className="summary-details">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Date:</strong> {formData.date}</p>
                    <p><strong>Time:</strong> {formData.time}</p>
                    <p><strong>Guests:</strong> {formData.guests}</p>
                    <p><strong>Contact:</strong> {formData.contact}</p>
                </div>
                <motion.button 
                    className="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setShowSummary(false);
                        setFormData({
                            name: '',
                            contact: '',
                            guests: '',
                            date: '',
                            time: ''
                        });
                    }}
                >
                    Make Another Booking
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="form-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1 className="form-heading">Restaurant Table Booking</h1>
            <form onSubmit={handleSubmit}>
                <Calendar 
                    onDateSelect={handleDateSelect}
                    bookedSlots={bookedSlots}
                />
                <TimeSlots 
                    onTimeSelect={handleTimeSelect}
                    selectedTime={formData.time}
                    bookedSlots={bookedSlots}
                    selectedDate={formData.date}
                />
                <InputField 
                    label="Name" 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                />
                <InputField 
                    label="Contact" 
                    type="tel" 
                    name="contact"
                    value={formData.contact} 
                    onChange={handleInputChange} 
                    required 
                />
                <InputField 
                    label="Number of Guests" 
                    type="number" 
                    name="guests"
                    value={formData.guests} 
                    onChange={handleInputChange} 
                    required 
                    min="1"
                    max="10"
                />
                <motion.button 
                    type="submit" 
                    className="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Book Now
                </motion.button>
            </form>
            {message && <SuccessMessage message={message} type={messageType} />}
        </motion.div>
    );
}