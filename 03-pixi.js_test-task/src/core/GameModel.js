import Observable from "../utils/Observable";
import {
    BASE_SETTINGS,
    CUSTOM_EVENTS,
} from "../utils/constants";

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
        console.log("Shape was added to model", shape);
        this.shapes.push(shape);
        this.notify(CUSTOM_EVENTS.SHAPE_ADDED, shape);
    }

    removeShape(shape) {
        console.log("Shape was removed from model", shape);
        shape.destroy();
        this.shapes = this.shapes.filter((s) => s !== shape);
        this.notify(CUSTOM_EVENTS.SHAPE_REMOVED, shape);
    }

    updateTotalCount(value) {
        console.log("Total count was updated in model", value);
        this.totalCount = value;
        this.notify(CUSTOM_EVENTS.TOTAL_COUNT_UPDATED, value);
    }

    updateTotalArea(value) {
        console.log("Total area was updated in model", value);
        this.totalArea = value;
        this.notify(CUSTOM_EVENTS.TOTAL_AREA_UPDATED, value);
    }

    updateSpawnAmount(value) {
        console.log("Spawn amount was updated in model", value);
        this.spawnAmount = value;
        this.notify(CUSTOM_EVENTS.SPAWN_AMOUNT_UPDATED, value);
    }

    updateGravity(value) {
        console.log("Gravity was updated in model", value);
        this.gravity = value;
        this.notify(CUSTOM_EVENTS.GRAVITY_UPDATED, value);
    }

    adjustShapesPositionX(contentBounds, scaleX) {
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

    updateShapesGravity() {
        this.shapes.forEach((shape) => shape.update(this.gravity));
    }

    // update() {
    //     this.shapes.forEach((shape) => shape.update(this.gravity));
    //     this.removeShapesOnOutOfBoard();
    //     this.updateCounters();
    // }
}
