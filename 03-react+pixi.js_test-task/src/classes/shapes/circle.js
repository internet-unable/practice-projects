import Shape from "./shape";

export default class Circle extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.circle(x + 20, y + 20, 20);
        graphics.fill();
    }
    getArea() {
        return Math.PI * 20 * 20;
    }
}
