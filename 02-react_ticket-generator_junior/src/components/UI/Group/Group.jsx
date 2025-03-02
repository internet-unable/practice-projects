import styles from "./Group.module.css";

export const groupStyles = {
    gap8: styles["group-gap--8"],
    gap15: styles["group-gap--15"],
    gap16: styles["group-gap--16"],
    gap20: styles["group-gap--20"],
    alignCenter: styles["group-align--center"],
    alignStart: styles["group-align--start"],
}

export default function Group({
    className = "",
    groupStyle = `${groupStyles.gap8} ${groupStyles.alignCenter}`,
    children,
    ...rest
}) {
    return (
        <div className={`${styles.group} ${groupStyle} ${className}`} {...rest}>
            {children}
        </div>
    );
}
