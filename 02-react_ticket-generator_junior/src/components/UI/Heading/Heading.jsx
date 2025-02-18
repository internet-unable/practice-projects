import styles from "./Heading.module.css";

export default function Heading({ tag = "h1", children, ...rest}) {
    const HeadingTag = tag;

    return (
        <HeadingTag className={styles[tag]} {...rest}>{children}</HeadingTag>
    );
}