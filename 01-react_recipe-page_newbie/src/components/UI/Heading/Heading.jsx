import classes from "./Heading.module.css";

export default function Heading({ tag = "h1", children, ...rest}) {
    const HeadingTag = tag;

    return (
        <HeadingTag {...rest}>{children}</HeadingTag>
    );
}