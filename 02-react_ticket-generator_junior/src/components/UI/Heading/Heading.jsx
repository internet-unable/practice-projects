import styles from "./Heading.module.css";

export const headingStyles = {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    h5: styles.h5,
    h6: styles.h6
}

export default function Heading({
    tag = "div",
    headingStyle = headingStyles.h1,
    className = "",
    children,
    ...rest
}) {
    const HeadingTag = tag;

    return (
        <HeadingTag
            className={`${className} ${headingStyle}`}
            {...rest}
        >
            {children}
        </HeadingTag>
    );
}