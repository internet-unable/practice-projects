import Shape from "./Shape";

const RADIUS = 20;

export default class Circle extends Shape {
    constructor(x, y, radius = RADIUS, color) {
        const adjustedY = y + radius;

        super(x, adjustedY, color);
        this.radius = radius * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        this.graphics.beginPath();
        this.graphics.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.graphics.closePath();

        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    getSize() {
        return { width: this.radius, height: this.radius };
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
