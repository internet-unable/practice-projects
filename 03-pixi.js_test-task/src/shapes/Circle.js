import Shape from "./Shape";

const RADIUS = 20;

export default class Circle extends Shape {
    constructor(x, y, radius = RADIUS, color) {
        super(x, y, color);
        this.radius = radius;
        this.draw();
    }

    draw() {
        super.draw();
        this.graphics.circle(this.x + this.radius, this.y + this.radius, this.radius);
        this.graphics.fill();
        this.graphics.y = this.y;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
