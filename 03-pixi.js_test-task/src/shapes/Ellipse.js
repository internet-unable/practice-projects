import Shape from "./Shape";

const RADIUS_X = 30;
const RADIUS_Y = 20;

export default class Ellipse extends Shape {
    constructor(x, y, radiusX = RADIUS_X, radiusY = RADIUS_Y, color) {
        const adjustedY = y + radiusY;

        super(x, adjustedY, color);
        this.radiusX = radiusX * this.scale;
        this.radiusY = radiusY * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        this.graphics.beginPath();
        this.graphics.ellipse(
            0,
            0,
            this.radiusX,
            this.radiusY,
            0,
            0,
            Math.PI * 2
        );
        this.graphics.closePath();

        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    getSize() {
        return { width: this.radiusX * 2, height: this.radiusY };
    }

    getArea() {
        return Math.PI * this.radiusX * this.radiusY;
    }
}
