import styles from "./Upload.module.css";

export default function Upload({ className = "", label, name, message, isValid = true, ...rest }) {
    return (
        <div className={`${className} ${styles["upload-group"]}`} {...rest}>
            {label && <div className={styles["upload-group__label"]}>{label}</div>}

            <label htmlFor={name} className={styles["upload-group__decorator"]}>
                <div>i</div>
                <div>Drag and drop or click to upload</div>
            </label>
            <input type="file" name={name} id={name} />

            {message && (
                <div className={`${styles["upload-group__message"]} ${!isValid ? styles["upload-group__message--invalid"] : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                        <path d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
                    </svg>
                    {message}
                </div>
            )}
        </div>
    );
}