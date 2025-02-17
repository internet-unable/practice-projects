import styles from "./List.module.css";

export const listStyles = {
    defaultBgRose800: `${styles["list-style--bg-rose-800"]}`,
    squareBgBrown800: `${styles["list-style--square"]} ${styles["list-style--bg-brown-800"]}`,
    decimalCBrown800: `${styles["list-style--decimal"]} ${styles["list-style--c-brown-800"]}`,
}

export default function List({ className = "", data, listStyle, ...rest }) {
    return (
        <ul className={`${className} ${listStyle}`} {...rest}>
            {data.map(item => (
                <li className={styles["list-item"]} key={item.id}>
                    <div className={styles["list-item__content"]}>
                        {item.desc && <><b>{item.desc}</b>: </>}
                        {item.value}
                    </div>
                </li>
            ))}
        </ul>
    );
}