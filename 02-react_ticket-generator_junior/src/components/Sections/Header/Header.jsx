import Row, { rowStyles } from "../../UI/Row/Row";
import LogoIcon from "../../UI/Icons/Logo/Logo";
import Heading, { headingStyles } from "../../UI/Heading/Heading";

import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Row rowStyle={rowStyles.gap15}>
                <LogoIcon />
                <Heading
                    tag="h3"
                    headingStyle={headingStyles.h3}
                >
                    Coding Conf
                </Heading>
            </Row>
        </header>
    );
}