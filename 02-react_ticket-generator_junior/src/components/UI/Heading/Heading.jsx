import styles from "./Heading.module.css";

export default function Heading({ tag = "h1", className = "", children, ...rest}) {
    const HeadingTag = tag;

    return (
        <HeadingTag className={`${styles[tag]} ${className}`} {...rest}>{children}</HeadingTag>
    );
}