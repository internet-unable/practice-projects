import Shape from "./Shape";

const SIZE = 40;
const MIN_POINTS = 5;
const MAX_POINTS = 12;

export default class RandomIrregularShape extends Shape {
    constructor(x, y, size = SIZE, color) {
        const adjustedY = y + size / 2;

        super(x, adjustedY, color);
        this.size = size * this.scale;
        this.points = [];
        this.generatePoints();
        this.draw();
    }

    generatePoints() {
        const numPoints =
            Math.floor(Math.random() * (MAX_POINTS - MIN_POINTS + 1)) +
            MIN_POINTS;

        for (let i = 0; i < numPoints; i++) {
            const baseAngle = (i * 2 * Math.PI) / numPoints;

            const angleVariation =
                (Math.random() * 0.3 - 0.15) * ((2 * Math.PI) / numPoints);
            const angle = baseAngle + angleVariation;

            const radiusVariation = 0.7 + Math.random() * 0.6;
            const radius = (this.size / 2) * radiusVariation;

            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            this.points.push({ x, y });
        }
    }

    draw() {
        super.draw();
        // Todo: need to find different approach to draw such random figure, to avoid effect of scaling
        this.graphics.beginPath();

        const firstPoint = this.points[0];
        this.graphics.moveTo(
            firstPoint.x * this.scale,
            firstPoint.y * this.scale
        );

        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            this.graphics.lineTo(point.x * this.scale, point.y * this.scale);
        }

        this.graphics.closePath();
        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    getSize() {
        const bounds = this.graphics.getBounds();
        return { width: bounds.width, height: bounds.height };
    }

    getArea() {
        let area = 0;
        const numPoints = this.points.length;

        for (let i = 0; i < numPoints; i++) {
            const j = (i + 1) % numPoints;
            area += this.points[i].x * this.points[j].y;
            area -= this.points[j].x * this.points[i].y;
        }

        area = (Math.abs(area) / 2) * this.scale * this.scale;
        return area;
    }
}
