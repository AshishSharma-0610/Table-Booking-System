import { format, addDays, startOfDay, isSameDay, isAfter } from 'date-fns';

export const getNextSevenDays = () => {
    const today = startOfDay(new Date());
    return Array.from({ length: 7 }, (_, index) => {
        const date = addDays(today, index);
        return {
            value: format(date, 'yyyy-MM-dd'),
            dayName: format(date, 'EEE'),
            dayNumber: format(date, 'd'),
            month: format(date, 'MMM'),
            available: true, // This can be updated based on booking availability
            isToday: isSameDay(date, today)
        };
    });
};

export const isDateAvailable = (date, bookedSlots) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return !bookedSlots?.some(slot => slot.date === formattedDate);
};

export const isPastDate = (date) => {
    return !isAfter(startOfDay(new Date(date)), startOfDay(new Date()));
};