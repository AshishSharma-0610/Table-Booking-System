"use client"
import { motion } from 'framer-motion';

export default function TimeSlots({ onTimeSelect, selectedTime, bookedSlots, selectedDate }) {
    const timeSlots = [
        "12:00", "13:00", "14:00", "15:00", "16:00", 
        "17:00", "18:00", "19:00", "20:00", "21:00"
    ];

    const isSlotBooked = (time) => {
        return bookedSlots?.some(slot => 
            slot.date === selectedDate && slot.time === time
        );
    };

    return (
        <div className="time-slots">
            <h3>Available Time Slots</h3>
            <div className="slots-grid">
                {timeSlots.map((time, index) => (
                    <motion.button
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isSlotBooked(time) ? 'booked' : ''}`}
                        onClick={() => !isSlotBooked(time) && onTimeSelect(time)}
                        disabled={isSlotBooked(time)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {time}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}