// src/components/SuccessMessage.js

export default function SuccessMessage({ message, type }) {
    return (
        <div className={`message ${type}`}>
            <p>{message}</p>
        </div>
    );
}
