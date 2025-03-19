import Shape from "./shape";

export default class Triangle extends Shape {
    draw(graphics, x, y) {
        graphics.clear();
        graphics.setFillStyle(this.color);
        graphics.poly([
            x,
            y + 40,
            x + 20,
            y,
            x + 40,
            y + 40,
        ]);
        graphics.fill();
    }
    getArea() {
        return 800;
    }
}
