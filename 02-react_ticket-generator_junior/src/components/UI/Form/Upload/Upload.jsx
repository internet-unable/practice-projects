import { useRef, useState } from "react";

import Button, { buttonStyles } from "../../Button/Button";
import UploadIcon from "../../Icons/UploadIcon/UploadIcon";
import Message, { messageStyles } from "../Message/Message";
import InfoIcon, { iconStyles } from "../../Icons/InfoIcon/InfoIcon";

import styles from "./Upload.module.css";

const UPLOAD_CONFIG = {
    MAX_FILE_SIZE: 50 * 1024,
    // MAX_FILE_SIZE: 500 * 1024,
    ACCEPTED_TYPES: ".jpg, .jpeg, .png",
    DEFAULT_ERROR_MESSAGE: 'File size exceeds limit'
};

function validateFile(file, maxSize) {
    if (!file) return true;
    return file.size <= maxSize;
}

export default function Upload({ className = "", label, name, defaultMessage, errorMessage, accept = UPLOAD_CONFIG.ACCEPTED_TYPES, ...rest }) {
    const inputRef = useRef(null);
    const [uploadState, setUploadState] = useState({
        image: null,
        isValidFileSize: null,
        message: defaultMessage
    });
    let messageStyle = messageStyles.default;
    let messageIconStyle = iconStyles.default;

    if (uploadState.isValidFileSize === false) {
        messageStyle = messageStyles.invalid;
        messageIconStyle = iconStyles.invalid;
    }

    function handleInputChange(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            if (errorMessage) {
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
            }

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
            setUploadState(prev => ({
                ...prev,
                isValidFileSize: false,
                message: 'Error processing file'
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
                        <div className="button-group">
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleRemoveImage}>Remove image</Button>
                            <Button buttonStyle={buttonStyles.util} type="button" onClick={handleChangeImage}>Change image</Button>
                        </div>
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