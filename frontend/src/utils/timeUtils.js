import { format, parse, isSameDay } from 'date-fns';

const RESTAURANT_HOURS = {
    START: 12, // 12 PM
    END: 22,   // 10 PM
    INTERVAL: 60 // 60 minutes
};

export const formatTimeDisplay = (hour) => {
    if (hour === 12) return '12 PM';
    if (hour > 12) return `${hour - 12} PM`;
    return `${hour} AM`;
};

export const getAvailableTimeSlots = (selectedDate, bookedSlots) => {
    const currentDate = new Date();
    const isToday = isSameDay(new Date(selectedDate), currentDate);
    const currentHour = currentDate.getHours();

    const slots = [];

    for (let hour = RESTAURANT_HOURS.START; hour <= RESTAURANT_HOURS.END; hour++) {
        // Skip past hours for today
        if (isToday && hour <= currentHour) {
            continue;
        }

        const timeValue = `${hour.toString().padStart(2, '0')}:00`;
        const isBooked = bookedSlots?.some(booking =>
            booking.date === selectedDate &&
            booking.time === timeValue
        );

        if (!isBooked) {
            slots.push({
                value: timeValue,
                display: formatTimeDisplay(hour)
            });
        }
    }

    return slots;
};