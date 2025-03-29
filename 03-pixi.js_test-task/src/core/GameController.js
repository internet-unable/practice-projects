import { HEADER_SETTINGS } from "../utils/constants";

import Circle from "../shapes/Circle";
import Ellipse from "../shapes/Ellipse";
import Hexagon from "../shapes/Hexagon";
import Pentagon from "../shapes/Pentagon";
import RandomIrregularShape from "../shapes/RandomIrregularShape";
import Square from "../shapes/Square";
import Star from "../shapes/Star";
import Triangle from "../shapes/Triangle";

const SHAPES = [
    Circle,
    Ellipse,
    Hexagon,
    Pentagon,
    RandomIrregularShape,
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

        this.setSpawnRateText();
        this.setGravityText();
        this.startSpawning();
        // this.handleContentPointerDown();
        this.setupEventListeners();
    }

    setSpawnRateText() {
        this.view.setSpawnRateText(`${this.model.spawnCount} shapes/sec`);
    }

    setGravityText() {
        this.view.setGravityText(this.model.gravity);
    }

    setupEventListeners() {
        this.view.on("addShape", (event) => this.handleAddShape(event));
        this.view.on("decreaseSpawn", () => this.handleSpawnRateChange(-1));
        this.view.on("increaseSpawn", () => this.handleSpawnRateChange(1));
        this.view.on("decreaseGravity", () => this.handleGravityChange(-1));
        this.view.on("increaseGravity", () => this.handleGravityChange(1));
    }

    startSpawning() {
        if (this.spawnLoop) return;

        // On init - time snapshot before the first shape spawn
        let shapeLastSpawnTime = performance.now();

        /*
            This function receives `currentTime` from the browser when it is called.
            It then calculates `deltaTime`, the number of milliseconds that have passed since the last shape spawn.
            If the required time has passed, it spawns a new shape.
            It then updates `shapeLastSpawnTime` with the current timestamp.
            Finally, it calls itself again using `requestAnimationFrame(spawn)`
        */
        const spawn = (currentTime) => {
            const deltaTime = currentTime - shapeLastSpawnTime;

            if (deltaTime >= this.model.spawnRate) {
                for (let i = 0; i < this.model.spawnCount; i++) {
                    this.addShape(
                        Math.random() * this.dimensions.EXPERIMENTAL_VALUE,
                        -HEADER_SETTINGS.HEIGHT
                    );
                }

                shapeLastSpawnTime = currentTime;
            }

            this.spawnLoop = requestAnimationFrame(spawn);
        };

        // Initial call of spawn
        this.spawnLoop = requestAnimationFrame(spawn);
    }

    // handleContentPointerDown() {
    //     this.view.content.on("pointerdown", (event) => {
    //         if (event.target !== this.view.content) return;

    //         const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
    //         this.addShape(event.data.global.x, y);
    //     });
    // }

    handleShapePointerDown(shape) {
        shape.graphics.on("pointerdown", () => {
            this.removeShape(shape);
        });
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

    resizeHeaderAndContent(dimension) {
        this.view.resize(dimension);
    }

    adjustShapesPositionX(dimensions, scaleX) {
        this.model.adjustShapesPositionX(dimensions, scaleX);
    }

    handleAddShape(event) {
        const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
        this.addShape(event.data.global.x, y);
    }

    handleSpawnRateChange(value) {
        this.model.spawnCount = Math.max(1, this.model.spawnCount + value);
        this.setSpawnRateText();
        this.startSpawning();
    }

    handleGravityChange(value) {
        this.model.gravity = Math.max(1, this.model.gravity + value);
        this.setGravityText();
    }
}
