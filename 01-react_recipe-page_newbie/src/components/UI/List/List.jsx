import styles from "./List.module.css";

export const LIST_TYPES = {
    ORDERD: "ol",
    UNORDERD: "ul",
}

export const LIST_STYLES = {
    DEFAULT_BG_ROSE_800: `${styles["list-style--bg-rose-800"]}`,
    SQUARE_BG_BROWN_800: `${styles["list-style--square"]} ${styles["list-style--bg-brown-800"]}`,
    DECIMAL_C_BROWN_800: `${styles["list-style--decimal"]} ${styles["list-style--c-brown-800"]}`,
}

export default function List({ className = "", data, listType = LIST_TYPES.UNORDERD, listStyle, ...rest }) {
    const ListTag = listType === LIST_TYPES.ORDERD ? "ol" : "ul";

    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <ListTag className={`${styles.list} ${listStyle} ${className}`} {...rest}>
            {data.map(item => (
                <li className={styles.item} key={item.id}>
                    <div className={styles["item-content"]}>
                        {item.desc && <><b>{item.desc}</b>: </>}
                        {item.value}
                    </div>
                </li>
            ))}
        </ListTag>
    );
}