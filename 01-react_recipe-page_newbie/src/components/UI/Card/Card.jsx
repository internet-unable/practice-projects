import styles from "./Card.module.css";

export const cardSizes = {
    L: "L",
    S: "S"
}

export default function Card({ className = "", cardSize, cardHeader, cardBody }) {
    let classes = `${className} ${styles.card} ${styles[`card--${cardSize}`]}`;

    return (
        <section className={classes}>
            {cardHeader && (<div className={styles.header}>{cardHeader}</div>)}
            <div className={styles.body}>{cardBody}</div>
        </section>
    );
}