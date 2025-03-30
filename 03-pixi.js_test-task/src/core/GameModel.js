import Observable from "../utils/Observable";
import {
    BASE_SETTINGS,
    CUSTOM_EVENTS,
} from "../utils/constants";
import { calculateDimensions } from "../utils/helpers";

export default class GameModel extends Observable {
    constructor() {
        super();
        this.shapes = [];
        this.totalCount = 0;
        this.totalArea = 0;
        this.spawnAmount = 1;
        this.spawnRate = BASE_SETTINGS.SPAWN_RATE;
        this.gravity = BASE_SETTINGS.GRAVITY;
    }

    addShape(shape) {
        this.shapes.push(shape);
        this.notify(CUSTOM_EVENTS.SHAPE_ADDED, shape);
    }

    removeShape(shape) {
        shape.destroy();
        this.shapes = this.shapes.filter((s) => s !== shape);
        this.notify(CUSTOM_EVENTS.SHAPE_REMOVED, shape);
    }

    updateTotalCount(value) {
        this.totalCount = value;
        this.notify(CUSTOM_EVENTS.TOTAL_COUNT_UPDATED, value);
    }

    updateTotalArea(value) {
        this.totalArea = value;
        this.notify(CUSTOM_EVENTS.TOTAL_AREA_UPDATED, value);
    }

    updateSpawnAmount(value) {
        this.spawnAmount = value;
        this.notify(CUSTOM_EVENTS.SPAWN_AMOUNT_UPDATED, value);
    }

    updateGravity(value) {
        this.gravity = value;
        this.notify(CUSTOM_EVENTS.GRAVITY_UPDATED, value);
    }

    updateShapesY() {
        if (this.shapes.length) {
            const { CANVAS_HEIGHT } = calculateDimensions();

            this.shapes = this.shapes.filter((shape) => {
                shape.updateY(this.gravity);

                if (shape.y > CANVAS_HEIGHT + shape.getSize().height) {
                    this.removeShape(shape);
                    return false;
                }

                return true;
            });
        }
    }

    updateShapesX(contentBounds, scaleX) {
        this.shapes.forEach((shape) => {
            shape.x = Math.min(
                Math.max(
                    shape.x * scaleX,
                    contentBounds.left + BASE_SETTINGS.ENTRY_POINT_PADDING
                ),
                contentBounds.right - BASE_SETTINGS.ENTRY_POINT_PADDING
            );

            shape.graphics.x = shape.x;
            shape.resize(scaleX);
        });
    }
}
