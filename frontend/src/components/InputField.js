"use client"
import { motion } from 'framer-motion';

export default function InputField({ label, type, name, value, onChange, required, min, max }) {
    return (
        <motion.div 
            className="input-field"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <label htmlFor={name} className="label">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="input"
                required={required}
                min={min}
                max={max}
            />
        </motion.div>
    );
}