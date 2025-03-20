import Shape from "./Shape";

export default class Triangle extends Shape {
    draw() {
        super.draw();
        this.graphics.poly([
            this.x,
            this.y + 40,
            this.x + 20,
            this.y,
            this.x + 40,
            this.y + 40,
        ]);
        this.graphics.fill();
    }
}
