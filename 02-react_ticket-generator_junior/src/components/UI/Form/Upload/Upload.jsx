import clsx from "clsx";
import { useRef, useState } from "react";

import UploadIcon from "../../Icons/Upload/Upload";
import Row from "../../Row/Row";
import Button, { buttonStyles } from "../../Button/Button";
import Message, { messageStyles } from "../Message/Message";
import InfoIcon, { iconStyles } from "../../Icons/Info/Info";

import styles from "./Upload.module.css";

export const UPLOAD_CONFIG = {
    // MAX_FILE_SIZE: 500 * 1024,
    MAX_FILE_SIZE: 50 * 1024,
    ACCEPTED_TYPES: {
        DEFAULT: ".jpg",
        IMAGES: ".jpg, .jpeg, .png",
    },
    MESSAGES: {
        DEFAULT: 'Upload your file',
        ERROR: 'Error processing file. Please try again later.',
        IMAGE_DEFAULT: "Upload your photo (JPG or PNG, max size: 500KB).",
        IMAGE_SIZE_ERROR: 'File too large. Please upload a photo under 500KB.'
    }
};

function validateFile(file, maxSize) {
    if (!file) return true;
    return file.size <= maxSize;
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function Upload({
    className = "",
    label = "Upload file",
    name = "file",
    defaultMessage = UPLOAD_CONFIG.MESSAGES.DEFAULT,
    errorMessage = UPLOAD_CONFIG.MESSAGES.ERROR,
    accept = UPLOAD_CONFIG.ACCEPTED_TYPES.DEFAULT,
    ...rest
}) {
    const inputRef = useRef(null);
    const [uploadState, setUploadState] = useState({
        image: null,
        isValidFileSize: null,
        message: defaultMessage
    });
    const [isDragging, setIsDragging] = useState(false);

    const uploadClasses = clsx({
        [styles.upload]: true,
        [className]: true
    });
    const decoratorContentClasses = clsx({
        [styles["decorator-content"]]: true,
        [styles["decorator-content--is-dragging"]]: isDragging
    });
    const decoratorContentDefaultClasses = clsx({
        [decoratorContentClasses]: true,
        [styles["decorator-content--default"]]: true
    });
    const messageStyle = clsx({
        [messageStyles.colorDefault]: uploadState.isValidFileSize !== false,
        [messageStyles.colorInvalid]: uploadState.isValidFileSize === false
    });
    const messageIconStyle = clsx({
        [iconStyles.size16]: true,
        [iconStyles.colorDefault]: uploadState.isValidFileSize !== false,
        [iconStyles.colorInvalid]: uploadState.isValidFileSize === false
    });

    async function manageFile(file, event) {
        // No file at all
        if (!file) return;

        // File size is invalid, too large
        const isFileSizeValid = validateFile(file, UPLOAD_CONFIG.MAX_FILE_SIZE);
        if (!isFileSizeValid) {
            setUploadState(prev => ({
                ...prev,
                isValidFileSize: false,
                message: errorMessage
            }));
            event.target.value = "";
            return;
        }

        // File size is valid
        try {
            const imageData = await readFile(file);

            setUploadState(prev => ({
                ...prev,
                image: imageData,
                isValidFileSize: true,
                message: defaultMessage
            }));
            // imageData.readAsDataURL(file);
        } catch (error) {
            // Error processing file
            setUploadState(prev => ({
                ...prev,
                isValidFileSize: false,
                message: UPLOAD_CONFIG.MESSAGES.ERROR
            }));
        }
    }

    function handleInputChange(event) {
        const file = event.target.files[0];

        manageFile(file, event);
    }

    function handleEnterKeyDown(event) {
        if (event.key === "Enter") {
            inputRef.current.click();
        }
    }

    function handleRemoveImageClick() {
        setUploadState(prev => ({
            ...prev,
            image: null,
            isValidFileSize: true,
        }));
        inputRef.current.value = "";
    }

    function handleChangeImageClick() {
        inputRef.current.click();
    }

    function handleDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
    };

    function handleDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    };

    function handleDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];

        manageFile(droppedFile, event);
    };

    return (
        <div className={uploadClasses}>
            {label && <div className={styles.fake__label}>{label}</div>}

            <div
                className={styles.decorator}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {!uploadState.image && (
                    <label
                        className={decoratorContentDefaultClasses}
                        htmlFor={name}
                        tabIndex="0"
                        onKeyUp={handleEnterKeyDown}
                    >
                        <div className={styles["decorator-content__icon"]}>
                            <UploadIcon />
                        </div>
                        Drag and drop or click to upload
                    </label>
                )}
                {uploadState.image && (
                    <div className={decoratorContentClasses}>
                        <img className={styles["decorator-content__image"]} src={uploadState.image} alt="" />
                        <Row className={styles["decorator-content__btn-row"]}>
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleRemoveImageClick}>Remove image</Button>
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleChangeImageClick}>Change image</Button>
                        </Row>
                    </div>
                )}
            </div>

            <input
                type="file"
                id={name}
                name={name}
                tabIndex="-1"
                ref={inputRef}
                onChange={handleInputChange}
                accept={accept}
                {...rest}
            />

            {uploadState.message && (
                <Message messageStyle={messageStyle}>
                    <InfoIcon iconStyle={messageIconStyle} />
                    {uploadState.message}
                </Message>
            )}
        </div>
    );
}