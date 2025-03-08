import styles from "./Button.module.css";

export const buttonStyles = {
    util: styles["button--util"],
    orange: styles["button--orange"]
};

export default function Button({ className = "", buttonStyle, children, ...rest }) {
    return (
        <button className={`${styles.button} ${className} ${buttonStyle}`} {...rest}>
            <span>{children}</span>
        </button>
    );
}