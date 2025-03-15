import { useActionState } from "react";

import Upload, { UPLOAD_CONFIG } from "../../UI/Form/Upload/Upload";
import Input from "../../UI/Form/Input/Input";
import Button, { buttonStyles } from "../../UI/Button/Button";

import styles from "./Form.module.css";

export default function Form({ className = "", onSubmit, ...rest }) {
    const [formState, formAction, isPending] = useActionState(handleFormSubmitAction);
    
    async function handleFormSubmitAction(prevFormState, formData) {
        // event.preventDefault();
        // console.log("formData", formData.get("email"));
        await new Promise((resolve) => setTimeout(onSubmit, 3000)); // fake request
    }

    return (
        <form
            className={className}
            action={formAction}
            {...rest}
        >
            <Upload
                className={styles["form-item"]}
                label="Upload Avatar"
                name="avatar"
                defaultMessage={UPLOAD_CONFIG.MESSAGES.IMAGE_DEFAULT}
                errorMessage={UPLOAD_CONFIG.MESSAGES.IMAGE_SIZE_ERROR}
                accept={UPLOAD_CONFIG.ACCEPTED_TYPES.IMAGES}
                disabled={isPending}
            // required
            />

            <Input
                className={styles["form-item"]}
                label="Full Name"
                type="text"
                name="full-name"
                pattern="[A-Za-z]+"
                title="Numbers and special characters are not allowed."
                disabled={isPending}
            // required
            />

            <Input
                className={styles["form-item"]}
                label="Email Address"
                type="email"
                name="email"
                placeholder="example@email.com"
                title="Please enter a valid email address."
                disabled={isPending}
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
                disabled={isPending}
            // required
            />

            <Button
                className={`full-width ${styles["form-item"]}`}
                buttonStyle={buttonStyles.orange}
                style={{ marginTop: "24px" }}
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Generate My Ticket"}
            </Button>
        </form>
    );
}