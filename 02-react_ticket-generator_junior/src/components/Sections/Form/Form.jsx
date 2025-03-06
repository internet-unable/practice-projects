import Upload, { UPLOAD_CONFIG } from "../../UI/Form/Upload/Upload";
import Input from "../../UI/Form/Input/Input";
import Button, { buttonStyles } from "../../UI/Button/Button";

import styles from "./Form.module.css";

export default function Form({ onSubmit }) {
    function handleFormSubmit(event) {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <Upload
                className={styles["form-item"]}
                label="Upload Avatar"
                name="avatar"
                defaultMessage={UPLOAD_CONFIG.MESSAGES.IMAGE_DEFAULT}
                errorMessage={UPLOAD_CONFIG.MESSAGES.IMAGE_SIZE_ERROR}
                accept={UPLOAD_CONFIG.ACCEPTED_TYPES.IMAGES}
            // required
            />

            <Input
                className={styles["form-item"]}
                label="Full Name"
                type="text"
                name="full-name"
                pattern="[A-Za-z]+"
                title="Numbers and special characters are not allowed."
            // required
            />

            <Input
                className={styles["form-item"]}
                label="Email Address"
                type="email"
                name="email"
                placeholder="example@email.com"
                title="Please enter a valid email address."
            // required
            />

            <Input
                className={styles["form-item"]}
                label="GitHub Username"
                type="text"
                name="github-username"
                placeholder="@yourusername"
                pattern="^@[A-Za-z0-9_]+$"
                title="Your username should start with @ and contain only letters, numbers, and underscores."
            // required
            />

            <Button
                className={`full-width ${styles["form-item"]}`}
                buttonStyle={buttonStyles.orange}
                style={{ marginTop: "24px" }}
            >
                Generate My Ticket
            </Button>
        </form>
    );
}