import styles from "./Row.module.css";

export const rowStyles = {
    gap8: styles["row-gap--8"],
    gap15: styles["row-gap--15"],
    gap16: styles["row-gap--16"],
    gap20: styles["row-gap--20"],
    alignCenter: styles["row-align--center"],
    alignStart: styles["row-align--start"],
    justifySpaceBetween: styles["row-justify--space-between"]
}

export default function Row({
    className = "",
    rowStyle = `${rowStyles.gap8} ${rowStyles.alignCenter}`,
    children,
    ...rest
}) {
    return (
        <div className={`${styles.row} ${rowStyle} ${className}`} {...rest}>
            {children}
        </div>
    );
}
