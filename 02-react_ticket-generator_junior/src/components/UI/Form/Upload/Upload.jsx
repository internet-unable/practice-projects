import { useRef, useState } from "react";
import styles from "./Upload.module.css";

export default function Upload({ className = "", label, name, hint, errorMessage, ...rest }) {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isValid, setIsValid] = useState(true);

    function handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            if (errorMessage) {
                // const maxSize = 500 * 1024;
                const maxSize = 50 * 1024;

                if (file.size > maxSize) {
                    setIsValid(false);
                    event.target.value = "";
                    return;
                } else {
                    setIsValid(true);
                }
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function handleEnterKeyDown(event) {
        if (event.key === "Enter") {
            inputRef.current.click();
        }
    }

    function handleFakeLabelClick() {
        inputRef.current.click();
    }

    return (
        <div className={`${className} ${styles["upload-group"]}`}>
            {label && <div className={styles["upload-group__label"]} onClick={handleFakeLabelClick}>{label}</div>}

            <div className={`${styles["upload-group__decorator"]} ${!image ? styles["upload-group__decorator--default-hover"] : ""}`} onKeyDown={handleEnterKeyDown}>
                {!image && (
                    <label htmlFor={name} tabIndex="0">
                        <div className={styles["upload-group__decorator-icon"]}>
                            <svg className="f-orange--500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                <path fillRule="evenodd" d="M21.894 11.252a.264.264 0 0 1-.229-.225c-.368-2.634-2.51-5.924-6.663-5.924-4.465 0-6.3 3.636-6.657 5.928a.264.264 0 0 1-.228.22c-2.95.362-4.945 2.622-4.945 5.729a5.802 5.802 0 0 0 3.423 5.277 6.274 6.274 0 0 0 2.305.468h2.528a.45.45 0 0 0 .45-.45c0-.267-.233-.472-.5-.484a3.077 3.077 0 0 1-2.049-.9 3.123 3.123 0 0 1 0-4.418l3.461-3.462c.147-.146.307-.277.479-.392.076-.05.158-.085.236-.129.1-.054.196-.114.301-.158.1-.04.206-.065.308-.096.092-.027.181-.062.276-.081.191-.039.384-.056.578-.059.011 0 .022-.004.034-.004.01 0 .018.003.027.004.196.002.391.02.584.059.094.019.18.053.271.08.105.031.211.055.313.098.1.042.193.098.288.15.084.046.17.083.25.137.154.103.295.221.428.349.016.014.034.024.049.039l3.463 3.463a3.124 3.124 0 0 1 0 4.42c-.558.56-1.284.86-2.05.897-.266.013-.497.219-.497.486 0 .249.202.451.451.451h2.512c.435 0 1.314-.06 2.344-.473a5.794 5.794 0 0 0 3.394-5.272c0-3.104-1.991-5.363-4.935-5.728Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M18.464 19.62a.936.936 0 0 0 .663-1.6l-3.464-3.464a.938.938 0 0 0-.664-.275l-.014.002a.932.932 0 0 0-.65.274l-3.462 3.462a.936.936 0 1 0 1.326 1.325l1.864-1.862v6.479a.937.937 0 1 0 1.875 0v-6.48l1.864 1.863a.93.93 0 0 0 .662.275Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Drag and drop or click to upload
                    </label>
                )}
                {image && (
                    <label htmlFor={name}>
                        <img src={image} alt="" />
                        <div>
                            <button type="button" onKeyDown={handleEnterKeyDown}>Remove image</button>
                            <button type="button" onKeyDown={handleEnterKeyDown}>Change image</button>
                        </div>
                    </label>
                )}
            </div>

            <input
                type="file"
                id={name}
                name={name}
                tabIndex="-1"
                ref={inputRef}
                onChange={handleFileChange}
                {...rest}
            />

            {hint && isValid && (
                <div className={styles["upload-group__message"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                        <path d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
                    </svg>
                    {hint}
                </div>
            )}

            {errorMessage && !isValid && (
                <div className={`${styles["upload-group__message"]} ${styles["upload-group__message--invalid"]}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                        <path d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
                    </svg>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}