import styles from "./Card.module.css";

export const CARD_SIZES = {
    LARGE: 'large',
    SMALL: 'small',
};

export default function Card({ 
    className = "", 
    cardSize = CARD_SIZES.LARGE, 
    cardHeader, 
    cardBody, 
    ...rest 
}) {
    let classes = `${className} ${styles.card} ${styles[`card--${cardSize}`]}`;

    return (
        <section className={classes} {...rest}>
            {cardHeader && (
                <div className={styles["card-header"]}>
                    {cardHeader}
                </div>
            )}
            {cardBody && (
                <div className={styles["card-body"]}>
                    {cardBody}
                </div>
            )}
        </section>
    );
}