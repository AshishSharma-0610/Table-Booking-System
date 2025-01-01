"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfDay } from 'date-fns';

export default function Calendar({ onDateSelect, bookedSlots }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const next7Days = [...Array(7)].map((_, i) => {
        const date = addDays(startOfDay(new Date()), i);
        return {
            date,
            dayName: format(date, 'EEE'),
            dayNumber: format(date, 'd')
        };
    });

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    return (
        <div className="calendar">
            <div className="days-container">
                {next7Days.map((day, index) => (
                    <motion.div
                        key={day.dayNumber}
                        className={`day-item ${format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd') ? 'selected' : ''}`}
                        onClick={() => handleDateClick(day.date)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="day-name">{day.dayName}</div>
                        <div className="day-number">{day.dayNumber}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}