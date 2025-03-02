import Group, { groupStyles } from "../../UI/Group/Group";
import LogoIcon from "../../UI/Icons/Logo/Logo";
import Heading from "../../UI/Heading/Heading";

import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Group groupStyle={groupStyles.gap15}>
                <LogoIcon />
                <Heading tag="h3">Coding Conf</Heading>
            </Group>
        </header>
    );
}