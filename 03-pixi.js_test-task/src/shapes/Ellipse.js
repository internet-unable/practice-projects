import Shape from "./Shape";

export default class Ellipse extends Shape {
    draw() {
        super.draw();
        this.graphics.ellipse(this.x + 20, this.y + 20, 25, 15);
        this.graphics.fill();
        this.graphics.y = this.y;
    }
    getArea() {
        return Math.PI * 600;
    }
}
