import styles from "./Card.module.css";

export const cardSizes = {
    L: "L",
    S: "S"
}

export default function Card({ className = "", cardSize, children }) {
    let classes = `${className} ${styles.card} ${styles[`card--${cardSize}`]}`;

    return (
        <section className={classes}>{children}</section>
    );
}