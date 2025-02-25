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
                hint="Upload your photo (JPG or PNG, max size: 500KB)."
                errorMessage="File too large. Please upload a photo under 500KB."
                accept=".jpg, .jpeg, .png"
                required
            />

            <Input
                className={styles["form-item"]}
                label="Full Name"
                type="text"
                name="full-name"
                pattern="[A-Za-z]+"
                title="Please enter a valid full name. Numbers and special characters are not allowed."
                required
            />

            <Input
                className={styles["form-item"]}
                label="Email Address"
                type="email"
                name="email"
                placeholder="example@email.com"
                message="Please enter a valid email address."
                title="Please enter a valid email address."
                required
            />

            <Input
                className={styles["form-item"]}
                label="GitHub Username"
                type="text"
                name="github-username"
                placeholder="@yourusername"
                pattern="^@[A-Za-z0-9_]+$"
                title="Please enter a valid github username. It should start with @ and contain only letters, numbers, and underscores."
                required
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