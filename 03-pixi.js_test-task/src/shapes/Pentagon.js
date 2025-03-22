import Shape from "./Shape";

export default class Pentagon extends Shape {
    draw() {
        super.draw();
        this.graphics.setFillStyle(this.color);
        this.graphics.poly([
            this.x,
            this.y + 40,
            this.x + 15,
            this.y,
            this.x + 45,
            this.y,
            this.x + 60,
            this.y + 40,
            this.x + 30,
            this.y + 60,
        ]);
        this.graphics.fill();
        this.graphics.y = this.y;
    }

    getArea() {
        return 1200;
    }
}
