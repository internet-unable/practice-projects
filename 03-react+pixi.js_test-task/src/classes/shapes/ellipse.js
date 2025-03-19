import Shape from "./shape";

export default class Ellipse extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.ellipse(x + 20, y + 20, 25, 15);
        graphics.fill();
    }
    getArea() {
        return Math.PI * 600;
    }
}
