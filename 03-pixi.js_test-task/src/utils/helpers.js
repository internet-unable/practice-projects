import { BASE_SETTINGS, HEADER_SETTINGS } from "./constants";

export function getAbsoluteHeight(el) {
    const styles = window.getComputedStyle(el);
    const margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

    return Math.ceil(el.offsetHeight + margin);
}

export function getDeviceDimensions() {
    const width = Math.min(
        window.innerWidth - BASE_SETTINGS.ENTRY_POINT_PADDING * 2,
        BASE_SETTINGS.CANVAS_WIDTH
    );
    const height = Math.min(
        window.innerHeight -
            getAbsoluteHeight(BASE_SETTINGS.CTRL_GROUP) -
            BASE_SETTINGS.ENTRY_POINT_PADDING * 2 -
            BASE_SETTINGS.STROKE_WIDTH * 2,
        BASE_SETTINGS.CANVAS_HEIGHT
    ); // Учитываем пространство для элементов управления
    return { width, height };
}

export function calculateDimensions() {
    const { width, height } = getDeviceDimensions();

    return {
        CANVAS_WIDTH: width,
        CANVAS_HEIGHT: height,
        HEADER_WIDTH: width,
        CONTENT_WIDTH: width - BASE_SETTINGS.STROKE_WIDTH,
        CONTENT_HEIGHT: height - HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH,
        EXPERIMENTAL_VALUE: width - 50,
    };
}