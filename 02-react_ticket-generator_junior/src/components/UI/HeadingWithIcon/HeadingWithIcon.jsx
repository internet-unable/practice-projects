import styles from "./HeadingWithIcon.module.css";

export const iconStyles = {
    sizeS_posLeft: "",
}

export default function HeadingWithIcon({ iconStyle, children }) {
    return (
        <div className={styles.iconStyle}>{children}</div>
    );
}