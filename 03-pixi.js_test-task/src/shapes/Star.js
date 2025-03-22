import Shape from "./Shape";

export default class Star extends Shape {
    draw() {
        super.draw()
        this.graphics.star(this.x + 20, this.y + 20, 5, 20);
        this.graphics.fill();
        this.graphics.y = this.y;
    }
    
    getArea() {
        return 1000;
    }
}
