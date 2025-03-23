import { BASE_SETTINGS, CONTENT_SETTINGS } from "../utils/constants";
import { getDeviceDimensions } from "../utils/helpers";

let { height: CANVAS_HEIGHT } = getDeviceDimensions();

export default class GameModel {
    constructor() {
        this.shapes = [];
        this.totalArea = 0;
        this.visibleShapesCount = 0;
        this.spawnRate = BASE_SETTINGS.SPAWN_RATE;
        this.gravity = BASE_SETTINGS.GRAVITY;
    }

    addShape(shape) {
        this.shapes.push(shape);
        this.updateVisibleShapes();
    }

    removeShape(shape) {
        shape.destroy();
        this.shapes = this.shapes.filter((s) => s !== shape);
        this.updateVisibleShapes();
    }

    updateVisibleShapes() {
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

    removeOutOfBoundsShapes() {
        this.shapes = this.shapes.filter((shape) => {
            if (shape.y > CANVAS_HEIGHT + shape.getSize().height) {
                this.removeShape(shape);
                return false;
            }
            return true;
        });

        this.updateVisibleShapes();
    }

    update() {
        this.shapes.forEach((shape) => shape.update(this.gravity));
        this.removeOutOfBoundsShapes();
        this.updateVisibleShapes();
    }
}
