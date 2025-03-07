import Row, { rowStyles } from "../../UI/Row/Row";
import Col, { colStyles } from "../../UI/Col/Col";
import LogoIcon, { iconStyles } from "../../UI/Icons/Logo/Logo";
import Heading, { headingStyles } from "../../UI/Heading/Heading";
import Paragraph, { paragraphStyles } from "../../UI/Paragraph/Paragraph";
import GithubIcon from "../../UI/Icons/Github/Github";

import styles from "./Ticket.module.css";

export default function Ticket({ className = "", ...rest }) {
    return (
        <div className={`${className} ${styles.ticket}`} {...rest}>
            <Row rowStyle={`${rowStyles.justifySpaceBetween} ${rowStyles.alignCenter}`}>
                <Col colStyle={`${colStyles.gap74}`}>
                    <Row rowStyle={`${rowStyles.gap20} ${rowStyles.alignStart}`}>
                        <LogoIcon iconStyle={`${iconStyles.size40} ${iconStyles.colorDefault}`} />
                        <div>
                            <Heading
                                tag="h2"
                                headingStyle={headingStyles.h2}
                                style={{ marginTop: "-4px", marginBottom: "19px" }}
                            >
                                Coding Conf
                            </Heading>
                            <Row rowStyle={`${rowStyles.gap15} ${rowStyles.alignCenter}`}>
                                <Paragraph paragraphStyle={paragraphStyles.size18}>Jan 31, 2025</Paragraph>
                                <Paragraph paragraphStyle={paragraphStyles.size18}>/</Paragraph>
                                <Paragraph paragraphStyle={paragraphStyles.size18}>Austin, TX</Paragraph>
                            </Row>
                        </div>
                    </Row>

                    <Row rowStyle={`${rowStyles.gap16} ${rowStyles.alignStart}`}>
                        <div className={styles.image}></div>
                        <div>
                            <Heading
                                tag="h4"
                                headingStyle={headingStyles.h4}
                                style={{ marginTop: "11px", marginBottom: "10px" }}
                            >
                                Jonatan Kristof
                            </Heading>
                            <Row>
                                <GithubIcon />
                                <Paragraph paragraphStyle={paragraphStyles.size19}>@jonatankristof0101</Paragraph>
                            </Row>
                        </div>
                    </Row>
                </Col>

                <div>
                    <Heading
                        tag="p"
                        headingStyle={headingStyles.h5}
                        className={styles.number}
                        style={{ marginTop: "-2px" }}
                    >
                        #01609
                    </Heading>
                </div>
            </Row>
        </div>
    );
}