import styles from "./Divider.module.css";

export default function Divider({ className = "", ...rest }) {
    return (
        <div className={`${className} ${styles.divider}`} {...rest}></div>
    );
}