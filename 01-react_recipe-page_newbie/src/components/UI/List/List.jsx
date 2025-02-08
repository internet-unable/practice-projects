import styles from "./List.module.css";

function classListToModules(initial, classList) {
    if (classList) {
        const splitted = classList.split(" ");
        const modules = splitted.map(item => `${styles[item]}`).join(" ");

        return `${initial} ${modules}`;
    } else {
        return initial;
    }
}

export default function List({ data, listStyle, ...rest }) {
    return (
        <ul className={listStyle && classListToModules(styles.list, listStyle)} {...rest}>
            {data.map(item => (
                <li className={styles.item} key={item.id}>
                    <div className={styles.content}>
                        {item.desc && <><b>{item.desc}</b>: </>}
                        {item.value}
                    </div>
                </li>
            ))}
        </ul>
    );
}