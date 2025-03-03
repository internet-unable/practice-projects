import styles from "./Info.module.css";

export const iconStyles = {
    size16: styles["icon-size--16"],
    colorDefault: styles["icon-color--default"],
    colorInvalid: styles["icon-color--invalid"],
}

export default function Info({ className = "", iconStyle = `${iconStyles.size16} ${iconStyles.colorDefault}` }) {
    return (
        <svg className={`${styles.icon} ${iconStyle} ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
            <path d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
        </svg>
    );
}
