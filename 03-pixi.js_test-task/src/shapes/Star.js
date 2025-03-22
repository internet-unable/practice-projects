import Shape from "./Shape";

const SIZE = 40;
const POINTS = 5;

export default class Star extends Shape {
    constructor(x, y, size = SIZE, points = POINTS, color) {
        super(x, y + size, color);
        this.size = size * this.scale;
        this.points = points;
        this.draw();
    }

    draw() {
        super.draw();
        const outerRadius = this.size / 2;
        const innerRadius = outerRadius * 0.4;
        
        this.graphics.beginPath();

        for (let i = 0; i < this.points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;

            const angle = (i * Math.PI / this.points) - Math.PI / 2;

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
        const outerRadius = this.size / 2;
        const innerRadius = outerRadius * 0.4;

        const pointArea = this.points * (
            (1/2) * outerRadius * outerRadius * Math.sin(2 * Math.PI / this.points) +
            (1/2) * innerRadius * innerRadius * Math.sin(2 * Math.PI / this.points)
        );
        
        return pointArea;
    }
}