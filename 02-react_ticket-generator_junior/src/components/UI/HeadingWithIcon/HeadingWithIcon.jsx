import styles from "./HeadingWithIcon.module.css";

export const iconStyles = {
    sizeS_posLeft: `${styles["icon-size--s"]} ${styles["icon-pos--left"]}`,
}

export default function HeadingWithIcon({ iconStyle, children }) {
    return (
        <div className={`${styles["heading-with-icon"]} ${iconStyle}`}>{children}</div>
    );
}