import styles from "./Col.module.css";

export const colStyles = {
    gap74: styles["col-gap--74"],
}

export default function Col({
    className = "",
    colStyle = "",
    children,
    ...rest
}) {
    return (
        <div className={`${styles.col} ${colStyle} ${className}`} {...rest}>
            {children}
        </div>
    );
}
