import Shape from "./shape";

export default class Star extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.star(x + 20, y + 20, 5, 20);
        graphics.fill();
    }
    getArea() {
        return 1000;
    }
}
