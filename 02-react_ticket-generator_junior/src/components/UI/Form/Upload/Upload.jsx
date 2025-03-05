import { useRef, useState } from "react";

import UploadIcon from "../../Icons/Upload/Upload";
import Row from "../../Row/Row";
import Button, { buttonStyles } from "../../Button/Button";
import Message, { messageStyles } from "../Message/Message";
import InfoIcon, { iconStyles } from "../../Icons/Info/Info";

import styles from "./Upload.module.css";

const UPLOAD_CONFIG = {
    // MAX_FILE_SIZE: 500 * 1024,
    MAX_FILE_SIZE: 50 * 1024,
    ACCEPTED_TYPES: ".jpg, .jpeg, .png",
    DEFAULT_MESSAGE: 'Upload your file',
    DEFAULT_ERROR_MESSAGE: 'Error processing file. Please try again later.'
};

function validateFile(file, maxSize) {
    if (!file) return true;
    return file.size <= maxSize;
}

export default function Upload({
        className = "",
        label = "Upload file",
        name = "file",
        defaultMessage = UPLOAD_CONFIG.DEFAULT_MESSAGE,
        errorMessage = UPLOAD_CONFIG.DEFAULT_ERROR_MESSAGE,
        accept = UPLOAD_CONFIG.ACCEPTED_TYPES,
        ...rest
    }) {
    const inputRef = useRef(null);
    const [uploadState, setUploadState] = useState({
        image: null,
        isValidFileSize: null,
        message: defaultMessage
    });
    let messageStyle = messageStyles.colorDefault;
    let messageIconStyle = `${iconStyles.size16} ${iconStyles.colorDefault}`;

    if (uploadState.isValidFileSize === false) {
        messageStyle = messageStyles.colorInvalid;
        messageIconStyle = `${iconStyles.size16} ${iconStyles.colorInvalid}`;
    }

    function handleInputChange(event) {
        try {
            // No file at all
            const file = event.target.files[0];
            if (!file) return;

            // File size is too large
            const isFileValid = validateFile(file, UPLOAD_CONFIG.MAX_FILE_SIZE);
            if (!isFileValid) {
                setUploadState(prev => ({
                    ...prev,
                    isValidFileSize: false,
                    message: errorMessage
                }));
                event.target.value = "";
                return;
            }

            // File is valid
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadState(prev => ({
                    ...prev,
                    image: reader.result,
                    isValidFileSize: true,
                    message: defaultMessage
                }));
            };
            reader.readAsDataURL(file);
        } catch (error) {
            // Error processing file
            setUploadState(prev => ({
                ...prev,
                isValidFileSize: false,
                message: UPLOAD_CONFIG.DEFAULT_ERROR_MESSAGE
            }));
        }
    }

    function handleEnterKeyDown(event) {
        if (event.key === "Enter") {
            inputRef.current.click();
        }
    }

    function handleRemoveImage() {
        setUploadState(prev => ({
            ...prev,
            image: null,
            isValidFileSize: true,
        }));
        inputRef.current.value = "";
    }

    function handleChangeImage() {
        inputRef.current.click();
    }

    return (
        <div className={`${styles.upload} ${className}`}>
            {label && <div className={styles.fake__label}>{label}</div>}

            <div className={styles.decorator}>
                {!uploadState.image && (
                    <label className={`${styles["decorator-content"]} ${styles["decorator-content--default"]}`} htmlFor={name} tabIndex="0" onKeyUp={handleEnterKeyDown}>
                        <div className={styles["decorator-content__icon"]}>
                            <UploadIcon />
                        </div>
                        Drag and drop or click to upload
                    </label>
                )}
                {uploadState.image && (
                    <div className={styles["decorator-content"]}>
                        <img className={styles["decorator-content__image"]} src={uploadState.image} alt="" />
                        <Row>
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleRemoveImage}>Remove image</Button>
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleChangeImage}>Change image</Button>
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