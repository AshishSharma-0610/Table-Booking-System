"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAvailableTimeSlots } from '../utils/timeUtils';

export default function TimeSlots({ onTimeSelect, selectedTime, bookedSlots, selectedDate }) {
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            const slots = getAvailableTimeSlots(selectedDate, bookedSlots);
            setAvailableSlots(slots);
        } else {
            setAvailableSlots([]);  // Clear available slots when no date is selected
        }
    }, [selectedDate, bookedSlots]);

    return (
        <div className="time-slots">
            <h3>Select Time</h3>
            <div className="slots-grid">
                <AnimatePresence mode="wait">
                    {!selectedDate ? (
                        // If no date is selected, display this message
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="no-slots-selected"
                        >
                            Select a date first
                        </motion.p>
                    ) : availableSlots.length > 0 ? (
                        // If date is selected and slots are available
                        availableSlots.map((slot, index) => (
                            <motion.button
                                key={slot.value}
                                className={`time-slot ${selectedTime === slot.value ? 'selected' : ''}`}
                                onClick={() => onTimeSelect(slot.value)}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    delay: index * 0.05
                                }}
                            >
                                {slot.display}
                            </motion.button>
                        ))
                    ) : (
                        // If no available slots for the selected date
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="no-slots-message"
                        >
                            No available time slots for this date
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
