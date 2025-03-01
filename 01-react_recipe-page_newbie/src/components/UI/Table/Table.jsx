import styles from "./Table.module.css";

export default function Table({ data }) {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <table className={styles.table}>
            <tbody>
                {data.map(item => (
                    <tr className={styles.row} key={item.id}>
                        <td className={`${styles.col} ${styles["col--left"]}`}>
                            <span className={styles["col-content"]}>{item.desc}</span>
                        </td>
                        <td className={`${styles.col} ${styles["col--right"]}`}>
                            <span className={styles["col-content"]}><b>{item.value}</b></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}