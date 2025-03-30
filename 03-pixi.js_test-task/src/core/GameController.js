import {
    BASE_SETTINGS,
    HEADER_SETTINGS,
    CONTENT_SETTINGS,
    CUSTOM_EVENTS,
} from "../utils/constants";
import { calculateDimensions } from "../utils/helpers";

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

        this.setupEventHandlers();
        this.startSpawning();
    }

    setupEventHandlers() {
        this.model.subscribe(CUSTOM_EVENTS.SHAPE_ADDED, (shape) =>
            this.handleModelShapeAdded(shape)
        );
        this.model.subscribe(CUSTOM_EVENTS.SHAPE_REMOVED, (shape) =>
            this.handleModelShapeRemoved(shape)
        );
        this.model.subscribe(CUSTOM_EVENTS.TOTAL_COUNT_UPDATED, (value) =>
            this.handleModelTotalCountUpdated(value)
        );
        this.model.subscribe(CUSTOM_EVENTS.TOTAL_AREA_UPDATED, (value) =>
            this.handleModelTotalAreaUpdated(value)
        );
        this.model.subscribe(CUSTOM_EVENTS.SPAWN_AMOUNT_UPDATED, (value) =>
            this.handleModelSpawnAmountUpdated(value)
        );
        this.model.subscribe(CUSTOM_EVENTS.GRAVITY_UPDATED, (value) =>
            this.handleModelGravityUpdated(value)
        );

        this.view.subscribe(CUSTOM_EVENTS.SHAPES_Y_UPDATE, () =>
            this.handleViewShapesYUpdate()
        );
        this.view.subscribe(CUSTOM_EVENTS.ADD_SHAPE, (event) =>
            this.handleViewAddShape(event)
        );
        this.view.subscribe(CUSTOM_EVENTS.REMOVE_SHAPE, (shape) =>
            this.handleViewRemoveShape(shape)
        );
        this.view.subscribe(CUSTOM_EVENTS.DECREASE_SPAWN_AMOUNT, () =>
            this.handleViewSpawnAmountChange(-1)
        );
        this.view.subscribe(CUSTOM_EVENTS.INCREASE_SPAWN_AMOUNT, () =>
            this.handleViewSpawnAmountChange(1)
        );
        this.view.subscribe(CUSTOM_EVENTS.DECREASE_GRAVITY, () =>
            this.handleViewGravityChange(-1)
        );
        this.view.subscribe(CUSTOM_EVENTS.INCREASE_GRAVITY, () =>
            this.handleViewGravityChange(1)
        );
        this.view.subscribe(CUSTOM_EVENTS.WINDOW_RESIZE, () =>
            this.handleViewWindowResize()
        );
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
        this.view.updateShapesText(value);
    }

    handleModelTotalAreaUpdated(value) {
        this.view.updateAreaText(value);
    }

    handleModelSpawnAmountUpdated(value) {
        const word = value === 1 ? "shape" : "shapes";

        this.view.updateSpawnAmountElText(`${value} ${word}/sec`);
    }

    handleModelGravityUpdated(value) {
        this.view.updateGravityElText(value);
    }

    handleViewShapesYUpdate() {
        this.model.updateShapesY();
    }

    handleViewAddShape(event) {
        const x = event.data.global.x;
        const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;

        this.addShape(x, y);
    }

    handleViewRemoveShape(shape) {
        this.removeShape(shape);
    }

    handleViewSpawnAmountChange(value) {
        this.model.updateSpawnAmount(
            Math.max(1, this.model.spawnAmount + value)
        );
    }

    handleViewGravityChange(value) {
        this.model.updateGravity(Math.max(1, this.model.gravity + value));
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
                for (let i = 0; i < this.model.spawnAmount; i++) {
                    const x =
                        Math.random() * this.dimensions.EXPERIMENTAL_VALUE;
                    const y = -HEADER_SETTINGS.HEIGHT;

                    this.addShape(x, y);
                }

                shapeLastSpawnTime = currentTime;
            }

            this.spawnLoop = requestAnimationFrame(spawn);
        };

        // Initial call of spawn
        this.spawnLoop = requestAnimationFrame(spawn);
    }

    addShape(x, y) {
        const shape = this.chooseShape(x, y);

        this.model.addShape(shape);
    }

    removeShape(shape) {
        this.model.removeShape(shape);
    }

    chooseShape(x, y) {
        const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const shape = new ShapeClass(x, y);

        return shape;
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

        return {
            totalCount: totalVisibleShapesCount,
            totalArea: totalVisibleShapesArea,
        };
    }

    handleViewWindowResize() {
        // Get prev canvas width, before resize
        const oldWidth = this.dimensions.CANVAS_WIDTH;
        // Update dimensions, because of resize
        this.dimensions = calculateDimensions();

        // Adjust canvas size
        this.gameBoard.renderer.resize(
            this.dimensions.CANVAS_WIDTH,
            this.dimensions.CANVAS_HEIGHT
        );

        // Adjust header and content size in View
        this.view.resizeHeader(this.dimensions);
        this.view.resizeContent(this.dimensions);

        // Adjust X position for each shape in model
        const scaleX =
            this.dimensions.CONTENT_WIDTH /
            (oldWidth - BASE_SETTINGS.STROKE_WIDTH);
        const contentBounds = {
            left: CONTENT_SETTINGS.OFFSET_X,
            right: CONTENT_SETTINGS.OFFSET_X + this.dimensions.CONTENT_WIDTH,
        };

        this.model.updateShapesX(contentBounds, scaleX);
    }
}
