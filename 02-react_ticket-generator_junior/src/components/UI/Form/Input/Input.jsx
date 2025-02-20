import styles from "./Input.module.css";

export default function Input({ label, type = "text", name, message, isValid = true }) {
    return (
        <div className={styles["input-group"]}>
            {label && <label htmlFor={name}>{label}</label>}

            <input type={type} name={name} id={name} />

            {message && (
                <div className={`${styles["input-group-message"]} ${!isValid ? styles["input-group-message--invalid"] : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                        <path d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
                    </svg>
                    {message}
                </div>
            )}
        </div>
    );
}