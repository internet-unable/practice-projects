import Row, { rowStyles } from "../../UI/Row/Row";
import LogoIcon, { iconStyles } from "../../UI/Icons/Logo/Logo";
import Heading, { headingStyles } from "../../UI/Heading/Heading";

import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Row rowStyle={rowStyles.gap15}>
                <LogoIcon iconStyle={`${iconStyles.size30} ${iconStyles.colorDefault} ${iconStyles["size24-m"]}`} />
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