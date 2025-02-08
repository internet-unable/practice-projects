import styles from "./Table.module.css";

export default function Table({ data }) {
    return (
        <ul className={styles.table}>
            {data.map(item => (
                <li className={styles.row} key={item.id}>
                    <div className={`${styles.col} ${styles["col--left"]}`}>
                        <span className={styles["col-content"]}>{item.desc}</span>
                    </div>

                    <div className={`${styles.col} ${styles["col--right"]}`}>
                        <span className={styles["col-content"]}><b>{item.value}</b></span>
                    </div>
                </li>
            ))}
        </ul>
    );
}