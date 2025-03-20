import Shape from "./Shape";

export default class Square extends Shape {
    draw() {
        super.draw();
        this.graphics.rect(this.x, this.y, 40, 40);
        this.graphics.fill();
    }
}
