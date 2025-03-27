import { BASE_SETTINGS, CONTENT_SETTINGS } from "../utils/constants";
import { calculateDimensions, getDeviceDimensions } from "../utils/helpers";

// let { height: CANVAS_HEIGHT } = getDeviceDimensions();

export default class GameModel {
    constructor() {
        this.shapes = [];
        this.totalArea = 0;
        this.visibleShapesCount = 0;
        this.spawnCount = 1;
        this.spawnRate = BASE_SETTINGS.SPAWN_RATE;
        this.gravity = BASE_SETTINGS.GRAVITY;
    }

    addShape(shape) {
        this.shapes.push(shape);
        this.updateCounters();
    }

    removeShape(shape) {
        shape.destroy();
        this.shapes = this.shapes.filter((s) => s !== shape);
        this.updateCounters();
    }

    updateCounters() {
        let count = 0;
        let totalArea = 0;
        this.shapes.forEach((shape) => {
            if (shape.isVisibleInContent(CONTENT_SETTINGS.OFFSET_Y)) {
                count++;
                totalArea += shape.getArea();
            }
        });

        this.visibleShapesCount = count;
        this.totalArea = totalArea;
    }

    removeShapesOnOutOfBoard() {
        const {height: CANVAS_HEIGHT } = getDeviceDimensions();

        if (this.shapes.length) {
            this.shapes = this.shapes.filter((shape) => {
                if (shape.y > CANVAS_HEIGHT + shape.getSize().height) {
                    this.removeShape(shape);
                    return false;
                }
                return true;
            });

            this.updateCounters();
        }
    }

    adjustShapesPositionX(dimensions, scaleX) {
        const contentBounds = {
            left: CONTENT_SETTINGS.OFFSET_X,
            right: CONTENT_SETTINGS.OFFSET_X + dimensions.CONTENT_WIDTH,
        };

        this.shapes.forEach((shape) => {
            shape.x = Math.min(
                Math.max(shape.x * scaleX, contentBounds.left + BASE_SETTINGS.ENTRY_POINT_PADDING),
                contentBounds.right - BASE_SETTINGS.ENTRY_POINT_PADDING
            );

            shape.graphics.x = shape.x;
            shape.resize(scaleX);
        });
    }

    update() {
        this.shapes.forEach((shape) => shape.update(this.gravity));
        this.removeShapesOnOutOfBoard();
        this.updateCounters();
    }
}
