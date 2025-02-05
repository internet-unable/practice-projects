import classes from "./Heading.module.css";

export default function Heading({ tag = "h1", children }) {
    const HeadingTag = tag;

    return (
        <HeadingTag>{children}</HeadingTag>
    );
}