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
    constructor(gameBoard, model, view, dimensions) {
        this.gameBoard = gameBoard;
        this.model = model;
        this.view = view;
        this.dimensions = dimensions;
        this.spawnLoop = null;

        this.gameBoard.ticker.add(() => this.updateModelAndView());

        this.setControlsText();
        this.startSpawning();
        this.handleContentPointerDown();
        this.handleDecreaseSpawnClick();
        this.handleIncreaseSpawnClick();
        this.handleDecreaseGravityClick();
        this.handleIncreaseGravityClick();
    }

    setControlsText() {
        this.view.setSpawnRateText(`${this.model.spawnRate} ms`);
        this.view.setGravityText(this.model.gravity);
    }

    startSpawning() {
        if (this.spawnLoop) clearInterval(this.spawnLoop);

        this.spawnLoop = setInterval(() => {
            this.addShape(
                Math.random() * this.dimensions.EXPERIMENTAL_VALUE,
                0
            );
        }, this.model.spawnRate);
    }

    handleContentPointerDown() {
        this.view.content.onpointerdown = (event) => {
            if (event.target !== this.view.content) return;

            const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
            this.addShape(event.data.global.x, y);
        };
    }

    handleShapePointerDown(shape) {
        shape.graphics.onpointerdown = () => {
            this.removeShape(shape);
        };
    }

    addShape(x, y) {
        const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const shape = new ShapeClass(x, y);

        this.model.addShape(shape);
        this.handleShapePointerDown(shape);
    }

    removeShape(shape) {
        // delete handler for shape, memory performance
        shape.graphics.off("pointerdown");
        this.model.removeShape(shape);
    }

    updateModelAndView() {
        this.model.update();
        this.view.render(this.model);
    }

    handleDecreaseSpawnClick() {
        this.view.decreaseSpawnBtn.onclick = () => {
            this.model.spawnRate = Math.max(1000, this.model.spawnRate - 1000);
            this.view.setSpawnRateText(`${this.model.spawnRate} ms`);
            this.startSpawning();
        };
    }

    handleIncreaseSpawnClick() {
        this.view.increaseSpawnBtn.onclick = () => {
            this.model.spawnRate += 1000;
            this.view.setSpawnRateText(`${this.model.spawnRate} ms`);
            this.startSpawning();
        };
    }

    handleDecreaseGravityClick() {
        this.view.decreaseGravityBtn.onclick = () => {
            this.model.gravity = Math.max(1, this.model.gravity - 1);
            this.view.setGravityText(this.model.gravity);
        };
    }

    handleIncreaseGravityClick() {
        this.view.increaseGravityBtn.onclick = () => {
            this.model.gravity += 1;
            this.view.setGravityText(this.model.gravity);
        };
    }
}
