import Upload from "../../UI/Form/Upload/Upload";
import Input from "../../UI/Form/Input/Input";
import Button from "../../UI/Button/Button";

import styles from "./Form.module.css";

export default function Form({ onSubmit }) {
    function handleFormValidation(event) {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={handleFormValidation}>
            <Upload
                className={styles["form-item"]}
                label="Upload Avatar"
                name="avatar"
                message="Upload your photo (JPG or PNG, max size: 500KB)."
            />

            <Input
                className={styles["form-item"]}
                label="Full Name"
                type="text"
                name="full-name"
            />

            <Input
                className={styles["form-item"]}
                label="Email Address"
                type="email"
                name="email"
                placeholder="example@email.com"
                message="Please enter a valid email address."
            />

            <Input
                className={styles["form-item"]}
                label="GitHub Username"
                type="text"
                name="github-username"
                placeholder="@yourusername"
            />

            <Button
                className={styles["form-item"]}
                style={{ marginTop: "24px" }}
            >
                Generate My Ticket
            </Button>
        </form>
    );
}