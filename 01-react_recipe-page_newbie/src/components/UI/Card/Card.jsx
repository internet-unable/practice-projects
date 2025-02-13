import styles from "./Card.module.css";

export const cardSizes = {
    L: "L",
    S: "S"
}

export default function Card({ className = "", cardSize = "L", cardHeader, cardBody }) {
    let classes = `${className} ${styles.card} ${styles[`card--${cardSize}`]}`;

    return (
        <section className={classes}>
            {cardHeader && (<div className={styles["card-header"]}>{cardHeader}</div>)}
            {cardBody && (<div className={styles["card-body"]}>{cardBody}</div>)}
        </section>
    );
}