import Shape from "./Shape";

const SIZE = 20;

export default class Triangle extends Shape {
    constructor(x, y, size = SIZE, color) {
        super(x, y + size, color);
        this.size = size * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        this.graphics.beginPath();
        this.graphics.moveTo(0, -this.size);
        this.graphics.lineTo(-this.size, this.size);
        this.graphics.lineTo(this.size, this.size);
        this.graphics.closePath();

        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    // resize(scaleFactor) {
    //     super.resize(scaleFactor);
    // }

    getArea() {
        return (this.size * this.size * Math.sqrt(3)) / 4;
    }
}
