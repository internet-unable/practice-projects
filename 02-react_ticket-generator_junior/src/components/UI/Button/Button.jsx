import styles from "./Button.module.css";

export default function Button({ className = "", children, ...rest }) {
    return (
        <button className={`${className} ${styles.button}`} {...rest}>{children}</button>
    );
}