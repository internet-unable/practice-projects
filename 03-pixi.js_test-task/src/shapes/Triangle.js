import Shape from "./Shape";

const BASE = 40;
const HEIGTH = 40;

export default class Triangle extends Shape {
    constructor(x, y, base = BASE, height = HEIGTH, color) {
        super(x, y, color);
        this.base = base;
        this.height = height;
        this.draw();
    }

    draw() {
        super.draw();
        this.graphics.poly([
            this.x, this.y + this.height,
            this.x + this.base / 2, this.y,
            this.x + this.base, this.y + this.height
        ]);
        this.graphics.fill();
        this.graphics.y = this.y;
    }

    getArea() {
        return 0.5 * this.base * this.height;
    }
}
