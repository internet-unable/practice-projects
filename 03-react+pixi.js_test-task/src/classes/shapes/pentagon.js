import Shape from "./shape";

export default class Pentagon extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.poly([
            x,
            y + 40,
            x + 15,
            y,
            x + 45,
            y,
            x + 60,
            y + 40,
            x + 30,
            y + 60,
        ]);
        graphics.fill();
    }
    getArea() {
        return 1200;
    }
}
