import Shape from "./Shape";

const SIZE = 40;

export default class Square extends Shape {
    constructor(x, y, size = SIZE, color) {
        super(x - size / 2, y + size / 2, color);
        this.size = size * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        this.graphics.rect(0, 0, this.size, this.size);
        this.graphics.fill();

        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    resize(scaleFactor) {
        super.resize(scaleFactor);
    }

    getArea() {
        return this.size * this.size;
    }
}
