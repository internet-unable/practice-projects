import Shape from "./Shape";

const SIZE = 40;

export default class Pentagon extends Shape {
    constructor(x, y, size = SIZE, color) {
        const adjustedY = y + size / 2;

        super(x, adjustedY, color);
        this.size = size * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        const radius = this.size / 2;

        this.graphics.beginPath();

        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            if (i === 0) {
                this.graphics.moveTo(x, y);
            } else {
                this.graphics.lineTo(x, y);
            }
        }

        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    // resize(scaleFactor) {
    //     super.resize(scaleFactor);
    // }

    getArea() {
        const sideLength = this.size * Math.sin(Math.PI / 5) / Math.sin(2 * Math.PI / 5);
        const apothem = this.size / 2 * Math.cos(Math.PI / 5);
        return 5 * sideLength * apothem / 2;
    }
}