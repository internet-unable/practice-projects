import { Graphics } from "pixi.js";

export default class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || Math.random() * 0xffffff;
        this.graphics = new Graphics();
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.setFillStyle(this.color);
    }

    update(gravity) {
        this.y += gravity;
        this.graphics.y = this.y;
    }

    destroy() {
        this.graphics.destroy();
    }
}
