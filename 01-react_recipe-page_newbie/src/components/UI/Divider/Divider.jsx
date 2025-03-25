import styles from "./Divider.module.css";

export default function Divider({ className = "", ...rest }) {
    return (
        <hr className={`${className} ${styles.divider}`} {...rest} />
    );
}