import Shape from "./Shape";

const RADIUS = 30;
const SIDES = 6

export default class Hexagon extends Shape {
    constructor(x, y, radius = RADIUS, color) {
        super(x, y, color);
        this.radius = radius;
        this.draw();
    }

    draw() {
        super.draw();

        const sides = SIDES;
        const startAngle = 0;

        this.graphics.moveTo(
            this.x + this.radius * Math.cos(startAngle),
            this.radius * Math.sin(startAngle)
        );
        
        for (let i = 1; i <= sides; i++) {
            const angle = startAngle + i * (Math.PI * 2) / sides;
            this.graphics.lineTo(
                this.x + this.radius * Math.cos(angle),
                this.radius * Math.sin(angle)
            );
        }
        
        this.graphics.fill();
    }
    
    getArea() {
        return (3 * Math.sqrt(3) / 2) * (this.radius * this.radius);
    }
}