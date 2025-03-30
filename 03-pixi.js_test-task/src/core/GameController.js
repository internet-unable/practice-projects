import { BASE_SETTINGS, HEADER_SETTINGS, CONTENT_SETTINGS, CUSTOM_EVENTS } from "../utils/constants";
import { getDeviceDimensions, calculateDimensions } from "../utils/helpers";

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

        this.gameBoard.ticker.add(() => this.handleModelAndViewUpdate());

        this.setupEventHandlers();
        // this.view.initSpawnAmountText();
        // this.view.initGravityText();
        this.startSpawning();
    }

    handleModelAndViewUpdate() {
        // this.model.update(); // gravity update
        // this.view.update(this.model);

        this.model.updateShapesGravity();
        this.handleShapesRemoveOnOutOfBoard();
        this.view.update(this.model);
    }

    handleShapesRemoveOnOutOfBoard() {
        const { CANVAS_HEIGHT } = calculateDimensions();

        if (this.model.shapes.length) {
            this.model.shapes.forEach((shape) => {
                if (shape.y > CANVAS_HEIGHT + shape.getSize().height) {
                    this.model.removeShape(shape);
                }
            });
        }
    }

    setupEventHandlers() {
        this.model.subscribe(CUSTOM_EVENTS.SHAPE_ADDED, (shape) => this.handleModelShapeAdded(shape));
        this.model.subscribe(CUSTOM_EVENTS.SHAPE_REMOVED, (shape) => this.handleModelShapeRemoved(shape));
        this.model.subscribe(CUSTOM_EVENTS.TOTAL_COUNT_UPDATED, (value) => this.handleModelTotalCountUpdated(value));
        this.model.subscribe(CUSTOM_EVENTS.TOTAL_AREA_UPDATED, (value) => this.handleModelTotalAreaUpdated(value));
        this.model.subscribe(CUSTOM_EVENTS.SPAWN_AMOUNT_UPDATED, (value) => this.handleModelSpawnAmountUpdated(value));
        this.model.subscribe(CUSTOM_EVENTS.GRAVITY_UPDATED, (value) => this.handleModelGravityUpdated(value));


        this.view.subscribe(CUSTOM_EVENTS.DRAW_SHAPE, (event) => this.handleAddShape(event));
        this.view.subscribe(CUSTOM_EVENTS.REMOVE_SHAPE, (shape) => this.handleRemoveShape(shape));
        this.view.subscribe(CUSTOM_EVENTS.DECREASE_SPAWN_AMOUNT, () => this.handleSpawnAmountChange(-1));
        this.view.subscribe(CUSTOM_EVENTS.INCREASE_SPAWN_AMOUNT, () => this.handleSpawnAmountChange(1));
        // this.view.subscribe(CUSTOM_EVENTS.SET_SPAWN_AMOUNT_TEXT, () => this.handleSpawAmountTextChange());
        this.view.subscribe(CUSTOM_EVENTS.DECREASE_GRAVITY, () => this.handleGravityChange(-1));
        this.view.subscribe(CUSTOM_EVENTS.INCREASE_GRAVITY, () => this.handleGravityChange(1));
        // this.view.subscribe(CUSTOM_EVENTS.SET_GRAVITY_TEXT, () => this.handleGravityTextChange());
    }

    handleModelShapeAdded(shape) {
        const { totalCount, totalArea } = this.calcTotalCountAndArea();

        this.view.handleShapeAdded(shape);
        this.model.updateTotalCount(totalCount);
        this.model.updateTotalArea(totalArea);
    }

    handleModelShapeRemoved(shape) {
        this.view.handleShapeRemoved(shape);
    }

    handleModelTotalCountUpdated(value) {
        this.view.updateShapesText(value)
    }

    handleModelTotalAreaUpdated(value) {
        this.view.updateAreaText(value);
    }

    handleModelSpawnAmountUpdated() {
        const word = this.model.spawnAmount === 1 ? "shape" : "shapes"

        this.view.updateSpawnAmountElText(`${this.model.spawnAmount} ${word}/sec`);
    }

    handleModelGravityUpdated(value) {
        this.view.updateGravityElText(value);
    }

    handleRemoveShape(shape) {
        this.model.removeShape(shape);
    }

    calcTotalCountAndArea() {
        let totalVisibleShapesCount = 0;
        let totalVisibleShapesArea = 0;

        this.model.shapes.forEach((shape) => {
            if (shape.isVisibleInContent(CONTENT_SETTINGS.OFFSET_Y)) {
                totalVisibleShapesCount++;
                totalVisibleShapesArea += shape.getArea();
            }
        });

        return { totalCount: totalVisibleShapesCount, totalArea: totalVisibleShapesArea };
    }

    handleAddShape(event) {
        const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
        this.addShape(event.data.global.x, y);
    }

    handleSpawnAmountChange(value) {
        this.model.updateSpawnAmount(Math.max(1, this.model.spawnAmount + value));
        // this.model.spawnCount = Math.max(1, this.model.spawnCount + value);
        // this.handleSpawAmountTextChange();
        // this.startSpawning();
    }

    // handleSpawAmountTextChange() {
    //     const word = this.model.spawnAmount === 1 ? "shape" : "shapes"

    //     this.view.updateSpawnAmountElText(`${this.model.spawnAmount} ${word}/sec`);
    //     // this.view.spawnRateEl.textContent = `${this.model.spawnCount} shapes/sec`;
    // }

    handleGravityChange(value) {
        this.model.updateGravity(Math.max(1, this.model.gravity + value));

        // this.model.gravity = Math.max(1, this.model.gravity + value);
        // this.handleGravityTextChange();
    }

    // handleGravityTextChange() {
    //     this.view.updateGravityElText(this.model.gravity);
    //     // this.view.gravityEl.textContent = this.model.gravity;
    // }

    addShape(x, y) {
        const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const shape = new ShapeClass(x, y);

        this.model.addShape(shape);
        // Todo: move shape handler to view
        // this.handleShapePointerDown(shape);
    }

    removeShape(shape) {
        // delete handler for shape, memory performance
        shape.graphics.off("pointerdown");
        this.model.removeShape(shape);
    }

    // handleShapePointerDown(shape) {
    //     shape.graphics.on("pointerdown", () => {
    //         this.removeShape(shape);
    //     });
    // }

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
                for (let i = 0; i < this.model.spawnAmount; i++) {
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


    resizeHeaderAndContent(dimension) {
        this.view.resize(dimension);
    }

    adjustShapesPositionX(dimensions, scaleX) {
        // this.model.adjustShapesPositionX(dimensions, scaleX);
        const contentBounds = {
            left: CONTENT_SETTINGS.OFFSET_X,
            right: CONTENT_SETTINGS.OFFSET_X + dimensions.CONTENT_WIDTH,
        };

        this.model.shapes.forEach((shape) => {
            shape.x = Math.min(
                Math.max(shape.x * scaleX, contentBounds.left + BASE_SETTINGS.ENTRY_POINT_PADDING),
                contentBounds.right - BASE_SETTINGS.ENTRY_POINT_PADDING
            );

            shape.graphics.x = shape.x;
            shape.resize(scaleX);
        });
    }
}
