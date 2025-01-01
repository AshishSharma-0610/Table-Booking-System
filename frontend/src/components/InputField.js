// src/components/InputField.js

export default function InputField({ label, type, value, onChange, required }) {
    return (
        <div className="input-field">
            <label htmlFor={label} className="label">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="input"
                required={required}
            />
        </div>
    );
}
