import styles from "./Container.module.css";

export const containerStyles = {
    maxWidth462: styles["container--462"],
    maxWidth600: styles["container--600"],
    maxWidth800: styles["container--800"]
}

export default function Container({ children, containerStyle = containerStyles.maxWidth800, className = "", ...rest }) {
    return (
        <div className={`${className} ${styles.container} ${containerStyle}`} {...rest}>{children}</div>
    );
}