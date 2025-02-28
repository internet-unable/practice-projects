import styles from "./Message.module.css";

export const messageStyles = {
    default: styles["message--default"],
    invalid: styles["message--invalid"],
}

export default function Message({ className = "", messageStyle = messageStyles.default, children, ...rest }) {
    return (
        <div className={`${styles.message} ${messageStyle} ${className}`} {...rest}>{children}</div>
    );
}
