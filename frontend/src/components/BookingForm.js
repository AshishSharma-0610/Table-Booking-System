// src/components/BookingForm.js
"use client"
import { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SuccessMessage from './SuccessMessage';

export default function BookingForm() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [guests, setGuests] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/bookings', {
                name,
                contact,
                guests,
                date,
                time,
            });

            setMessage('Booking confirmed!');
            setMessageType('success');
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-heading">Restaurant Table Booking</h1>
            <form onSubmit={handleSubmit}>
                <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <InputField label="Contact" type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <InputField label="Number of Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} required />
                <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <InputField label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type="submit" className="button">
                    Book Now
                </button>
            </form>
            {message && <SuccessMessage message={message} type={messageType} />}
        </div>
    );
}
