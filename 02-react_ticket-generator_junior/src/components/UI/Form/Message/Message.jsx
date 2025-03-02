import styles from "./Message.module.css";

export const messageStyles = {
    colorDefault: styles["message-color--default"],
    colorInvalid: styles["message-color--invalid"],
}

export default function Message({ className = "", messageStyle = messageStyles.colorDefault, children, ...rest }) {
    return (
        <div className={`${styles.message} ${messageStyle} ${className}`} {...rest}>{children}</div>
    );
}
