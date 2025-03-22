import { Graphics } from "pixi.js";

export default class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || Math.random() * 0xffffff;
        this.graphics = new Graphics();
        this.graphics.interactive = true;
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.setFillStyle(this.color);
    }

    update(gravity) {
        this.y += gravity;

        // из-за этого смещаеться по y
        // console.log(this.graphics.y);
        this.graphics.y = this.y;

    }

    isVisibleInContent(contentY) {
        // Todo: should be HEADER_HEIGHT
        return this.y + 30 >= contentY;
    }

    getArea() {
        return 0;
    }

    destroy() {
        this.graphics.destroy();
    }
}
