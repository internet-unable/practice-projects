import Shape from "./Shape";

const RADIUS = 30;
const SIDES = 6
const START_ANGLE = 0;

export default class Hexagon extends Shape {
    constructor(x, y, radius = RADIUS, color) {
        super(x, y + radius, color);
        this.radius = radius * this.scale;
        this.draw();
    }

    draw() {
        super.draw();

        const sides = SIDES;
        const startAngle = START_ANGLE;

        this.graphics.moveTo(
            this.radius * Math.cos(startAngle),
            this.radius * Math.sin(startAngle)
        );

        for (let i = 1; i <= sides; i++) {
            const angle = startAngle + i * (Math.PI * 2) / sides;
            this.graphics.lineTo(
                this.radius * Math.cos(angle),
                this.radius * Math.sin(angle)
            );
        }

        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    resize(scaleFactor) {
        super.resize(scaleFactor);
    }

    getArea() {
        return (3 * Math.sqrt(3) / 2) * (this.radius * this.radius);
    }
}