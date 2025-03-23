import { Graphics } from "pixi.js";
import { HEADER_SETTINGS } from "../utils/constants";

export default class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color || Math.random() * 0xffffff;
        this.graphics = new Graphics();
        this.graphics.interactive = true;
        this.scale = 1;
    }

    draw() {
        this.graphics.clear();
        this.graphics.setFillStyle(this.color);
    }

    update(gravity) {
        this.y += gravity;
        this.graphics.y = this.y;
    }

    resize(scaleFactor) {
        this.scale *= scaleFactor;
        this.draw();
    }

    isVisibleInContent(contentY) {
        return this.y + HEADER_SETTINGS.HEIGHT >= contentY;
    }

    getSize() {
        return { width: 0, height: 0 };
    }

    getArea() {
        return 0;
    }

    destroy() {
        this.graphics.destroy();
    }
}
