"use client"
import { motion } from 'framer-motion';
import { format, addDays, startOfDay } from 'date-fns';
import { getNextSevenDays, isDateAvailable } from '../utils/dateUtils';

export default function DatePicker({ onDateSelect, selectedDate, bookedSlots }) {
    const availableDates = getNextSevenDays();

    return (
        <div className="calendar">
            <h3>Select Date</h3>
            <div className="days-container">
                {availableDates.map((day, index) => (
                    <motion.div
                        key={day.value}
                        className={`day-item ${selectedDate === day.value ? 'selected' : ''} 
                                  ${!day.available ? 'fully-booked' : ''}`}
                        onClick={() => day.available && onDateSelect(day.value)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={day.available ? { scale: 1.05 } : {}}
                        whileTap={day.available ? { scale: 0.95 } : {}}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                        <div className="day-info">
                            <span className="day-name">{day.dayName}</span>
                            <span className="day-number">{day.dayNumber}</span>
                            <span className="month">{day.month}</span>
                        </div>
                        {!day.available && (
                            <span className="booked-badge">Fully Booked</span>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}