import styles from "./Paragraph.module.css";

export const paragraphStyles = {
    size18: styles["paragraph-size--18"],
    size19: styles["paragraph-size--19"],
    size23: styles["paragraph-size--23"],
}

export default function Paragraph({ tag = "p", className = "", paragraphStyle = paragraphStyles.size18, children, ...rest }) {
    const ParagraphTag = tag;

    return (
        <ParagraphTag className={`${styles.paragraph} ${paragraphStyle} ${className}`} {...rest}>
            {children}
        </ParagraphTag>
    );
}
