import styles from "./Ticket.module.css";

export default function Ticket() {
    return (
        <div className={styles.test}>
            <div className={styles.ticket}>
                <div className={styles["ticket-inner"]}>
                    <div className={styles["ticket-logo"]}>
                        <div className={styles["logo-icon"]}>⚙️</div>
                        <h3>Coding Conf</h3>
                    </div>
                    <div>Jan 31, 2025 / Austin, TX</div>
                </div>

                <div className={styles["ticket-details"]}>
                    <div className={styles.profile}>
                        <div className={styles["profile-pic"]}></div>
                        <div className={styles["profile-info"]}>
                            <h3>Jonatan Kristof</h3>
                            <div className={styles["profile-social"]}>
                                <span>@jonatankristof0101</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles["ticket-number"]}>#80109</div>
                </div>
            </div>
        </div>
    );
}