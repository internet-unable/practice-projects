import { classListToModules } from "../../../utils";
import styles from "./List.module.css";

export default function List({ data, listStyle, ...rest }) {
    return (
        <ul className={listStyle && classListToModules(styles.list, listStyle, styles)} {...rest}>
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