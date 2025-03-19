export default class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || Math.random() * 0xffffff;
    }

    update(gravity) {
        this.y += gravity;
    }

    draw(graphics, x, y) {}

    isVisible() {
        return this.y >= 0;
    }
}
