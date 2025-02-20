import styles from "./Button.module.css";

export default function Button({children, ...rest}) {
    return (
        <button className={styles.button} {...rest}>{children}</button>
    );
}