import Shape from "./Shape";

export default class Circle extends Shape {
    draw() {
        super.draw();
        this.graphics.circle(this.x + 20, this.y + 20, 20);
        this.graphics.fill();
    }
}
