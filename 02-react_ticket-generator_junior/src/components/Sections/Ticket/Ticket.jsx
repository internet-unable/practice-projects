import Group, { groupStyles } from "../../UI/Group/Group";
import LogoIcon, { iconStyles } from "../../UI/Icons/Logo/Logo";
import Heading from "../../UI/Heading/Heading";
import Paragraph, { paragraphStyles } from "../../UI/Paragraph/Paragraph";
import GithubIcon from "../../UI/Icons/Github/Github";

import styles from "./Ticket.module.css";

export default function Ticket() {
    return (
        <div className={styles.ticket}>
            <Group groupStyle={`${groupStyles.gap20} ${groupStyles.alignStart}`}>
                <LogoIcon iconStyle={`${iconStyles.size40} ${iconStyles.colorDefault}`} />
                <div>
                    <Heading tag="h2" style={{ marginTop: "-4px", marginBottom: "19px" }}>Coding Conf</Heading>
                    <Group groupStyle={`${groupStyles.gap15} ${groupStyles.alignCenter}`}>
                        <Paragraph paragraphStyle={paragraphStyles.size18}>Jan 31, 2025</Paragraph>
                        <Paragraph paragraphStyle={paragraphStyles.size18}>/</Paragraph>
                        <Paragraph paragraphStyle={paragraphStyles.size18}>Austin, TX</Paragraph>
                    </Group>
                </div>
            </Group>

            <Group groupStyle={`${groupStyles.gap16} ${groupStyles.alignStart}`}>
                <div className={styles.image}></div>
                <div>
                    <Heading tag="h4" style={{ marginTop: "11px", marginBottom: "10px" }}>Jonatan Kristof</Heading>
                    <Group>
                        <GithubIcon />
                        <Paragraph paragraphStyle={paragraphStyles.size19}>@jonatankristof0101</Paragraph>
                    </Group>
                </div>
            </Group>

            <div className={styles["ticket-number"]}>
                <Heading tag="h5">#01609</Heading>
            </div>
        </div>
    );
}