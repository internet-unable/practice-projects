import styles from "./Table.module.css";

export default function Table({ data }) {
    return (
        <ul className={styles.table}>
            {data.map(item => (
                <li className={styles["table-row"]} key={item.id}>
                    <div className={`${styles["table-col"]} ${styles["table-col--left"]}`}>
                        <span className={styles["table-col__content"]}>{item.desc}</span>
                    </div>

                    <div className={`${styles["table-col"]} ${styles["table-col--right"]}`}>
                        <span className={styles["table-col__content"]}><b>{item.value}</b></span>
                    </div>
                </li>
            ))}
        </ul>
    );
}