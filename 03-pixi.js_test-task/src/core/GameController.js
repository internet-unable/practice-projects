import { HEADER_SETTINGS } from "../utils/constants";

import Circle from "../shapes/Circle";
import Ellipse from "../shapes/Ellipse";
import Hexagon from "../shapes/Hexagon";
import Pentagon from "../shapes/Pentagon";
// import RandomIrregularShape from "../shapes/RandomIrregularShape";
import Square from "../shapes/Square";
import Star from "../shapes/Star";
import Triangle from "../shapes/Triangle";

const SHAPES = [
    Circle,
    Ellipse,
    Hexagon,
    Pentagon,
    // RandomIrregularShape,
    Square,
    Star,
    Triangle,
];

export default class GameController {
    constructor(app, model, view, dimensions) {
        this.app = app;
        this.model = model;
        this.view = view;
        this.dimensions = dimensions;
        this.spawnLoop = null;

        app.ticker.add(() => this.update());

        this.handleContentPointerDown();
        this.createHandlersForControlsButtons();
        this.startSpawning();
    }

    handleContentPointerDown() {
        this.view.content.onpointerdown = (event) => {
            if (event.target !== this.view.content) return;
            const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
            this.addShape(event.data.global.x, y);
        };
    }

    startSpawning() {
        if (this.spawnLoop) clearInterval(this.spawnLoop);

        this.spawnLoop = setInterval(() => {
            this.addShape(Math.random() * this.dimensions.EXPERIMENTAL_VALUE, 0);
        }, this.model.spawnRate);
    }

    addShape(x, y) {
        const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const shape = new ShapeClass(x, y);

        this.handleShapePointerDown(shape);
        this.model.addShape(shape);
    }

    handleShapePointerDown(shape) {
        shape.graphics.onpointerdown = (event) => {
            event.stopPropagation();
            this.removeShape(shape);
        };
    }

    removeShape(shape) {
        this.model.removeShape(shape);
    }

    update() {
        this.model.update();
        this.view.render();
    }

    createHandlersForControlsButtons() {
        const decreaseSpawnBtn = document.getElementById("decreaseSpawn");
        const spawnRateEl = document.getElementById("spawnRate");
        const increaseSpawnBtn = document.getElementById("increaseSpawn");
        const decreaseGravityBtn = document.getElementById("decreaseGravity");
        const gtavityEl = document.getElementById("gravity");
        const increaseGravityBtn = document.getElementById("increaseGravity");

        spawnRateEl.textContent = `${this.model.spawnRate} ms`;
        gtavityEl.textContent = this.model.gravity;

        decreaseSpawnBtn.onclick = () => {
            this.model.spawnRate = Math.max(1000, this.model.spawnRate - 1000);
            spawnRateEl.textContent = `${this.model.spawnRate} ms`;
            this.startSpawning();
        };

        increaseSpawnBtn.onclick = () => {
            this.model.spawnRate += 1000;
            spawnRateEl.textContent = `${this.model.spawnRate} ms`;
            this.startSpawning();
        };

        decreaseGravityBtn.onclick = () => {
            this.model.gravity = Math.max(1, this.model.gravity - 1);
            gtavityEl.textContent = this.model.gravity;
        };

        increaseGravityBtn.onclick = () => {
            this.model.gravity += 1;
            gtavityEl.textContent = this.model.gravity;
        };
    }
}
