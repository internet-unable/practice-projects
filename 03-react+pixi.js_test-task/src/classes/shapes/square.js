import Shape from "./shape";

export default class Square extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.rect(x, y, 40, 40);
        graphics.fill();
    }
    getArea() {
        return 40 * 40;
    }
}
