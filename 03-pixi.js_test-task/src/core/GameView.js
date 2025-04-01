import Observable from "../utils/Observable";
import { Container, Rectangle, Graphics, Text } from "pixi.js";
import {
    BASE_SETTINGS,
    HEADER_SETTINGS,
    SHAPES_SETTINGS,
    AREA_SETTINGS,
    CONTENT_SETTINGS,
    CUSTOM_EVENTS,
} from "../utils/constants";

export default class GameView extends Observable {
    constructor(gameBoard, dimensions) {
        super();
        this.gameBoard = gameBoard;
        this.dimensions = dimensions;

        this.initializeUI();
        this.setupEventHandlers();
        this.gameBoard.ticker.add(() => this.onViewUpdate());
    }

    initializeUI() {
        this.initializeMain();
        this.initializeHeader();
        this.initializeContent();
        this.initializeControls();
    }

    initializeMain() {
        this.main = new Container();
        this.gameBoard.stage.addChild(this.main);
    }

    initializeHeader() {
        this.header = new Container();
        this.header.sortableChildren = true;
        this.header.zIndex = HEADER_SETTINGS.Z_INDEX;
        this.main.addChild(this.header);

        this.createHeaderElements();
    }

    initializeContent() {
        this.content = new Container();
        this.content.sortableChildren = true;
        this.content.interactive = true;
        this.main.addChild(this.content);

        this.createContentElements();
    }

    initializeControls() {
        this.decreaseSpawnBtn = document.getElementById(
            BASE_SETTINGS.CTRL_DECREASE_SPAWN
        );
        this.increaseSpawnBtn = document.getElementById(
            BASE_SETTINGS.CTRL_INCREASE_SPAWN
        );
        this.spawnAmountEl = document.getElementById(
            BASE_SETTINGS.CTRL_SPAWN_EL
        );
        this.decreaseGravityBtn = document.getElementById(
            BASE_SETTINGS.CTRL_DECREASE_GRAVITY
        );
        this.increaseGravityBtn = document.getElementById(
            BASE_SETTINGS.CTRL_INCREASE_GRAVITY
        );
        this.gravityEl = document.getElementById(BASE_SETTINGS.CTRL_GRAVITY_EL);
    }

    createHeaderElements() {
        this.createHeaderBg();
        this.createShapesBorderAndText();
        this.createAreaBorderAndText();

        this.drawHeaderElements(this.dimensions);
    }

    createHeaderBg() {
        this.headerBg = new Graphics();
        this.header.addChild(this.headerBg);
    }

    createShapesBorderAndText() {
        this.shapesBorder = new Graphics();
        this.shapesText = new Text({
            text: `Shapes: 0`,
            style: {
                fill: BASE_SETTINGS.TEXT_COLOR,
                fontSize: BASE_SETTINGS.FONT_SIZE,
            },
        });
        this.header.addChild(this.shapesBorder);
        this.header.addChild(this.shapesText);
    }

    createAreaBorderAndText() {
        this.areaBorder = new Graphics();
        this.areaText = new Text({
            text: `Area: 0 px²`,
            style: {
                fill: BASE_SETTINGS.TEXT_COLOR,
                fontSize: BASE_SETTINGS.FONT_SIZE,
            },
        });
        this.header.addChild(this.areaBorder);
        this.header.addChild(this.areaText);
    }

    createContentElements() {
        this.contentBorder = new Graphics();
        this.main.addChild(this.contentBorder);

        this.drawContentElements(this.dimensions);
    }

    drawHeaderElements(dimensions) {
        this.drawHeaderBg(dimensions);
        this.drawShapesBorderAndText();
        this.drawAreaBorderAndText();
    }

    drawHeaderBg(dimensions) {
        this.headerBg.clear();
        this.headerBg.rect(
            0,
            0,
            dimensions.HEADER_WIDTH,
            HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH
        );
        this.headerBg.fill("white");
        // this.headerBg.fill("cyan"); // for debugging
    }

    drawShapesBorderAndText() {
        this.shapesBorder.clear();
        this.shapesBorder.rect(
            SHAPES_SETTINGS.OFFSET_X,
            SHAPES_SETTINGS.OFFSET_Y,
            SHAPES_SETTINGS.WIDTH,
            SHAPES_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH
        );
        this.shapesBorder.setStrokeStyle({
            width: BASE_SETTINGS.STROKE_WIDTH,
            color: BASE_SETTINGS.STROKE_COLOR,
        });
        this.shapesBorder.stroke();

        this.shapesText.position.set(
            SHAPES_SETTINGS.TEXT_OFFSET_X,
            SHAPES_SETTINGS.TEXT_OFFSET_Y
        );
    }

    drawAreaBorderAndText() {
        this.areaBorder.clear();
        this.areaBorder.rect(
            AREA_SETTINGS.OFFSET_X,
            AREA_SETTINGS.OFFSET_Y,
            AREA_SETTINGS.WIDTH,
            AREA_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH
        );
        this.areaBorder.setStrokeStyle({
            width: BASE_SETTINGS.STROKE_WIDTH,
            color: BASE_SETTINGS.STROKE_COLOR,
        });
        this.areaBorder.stroke();

        this.areaText.position.set(
            AREA_SETTINGS.TEXT_OFFSET_X,
            AREA_SETTINGS.TEXT_OFFSET_Y
        );
    }

    drawContentElements(dimensions) {
        this.drawContentHitArea(dimensions);
        this.drawContentBorder(dimensions);
    }

    drawContentHitArea(dimensions) {
        this.content.hitArea = new Rectangle(
            CONTENT_SETTINGS.OFFSET_X,
            CONTENT_SETTINGS.OFFSET_Y,
            dimensions.CONTENT_WIDTH,
            dimensions.CONTENT_HEIGHT
        );
    }

    drawContentBorder(dimensions) {
        this.contentBorder.clear();
        this.contentBorder.rect(
            CONTENT_SETTINGS.OFFSET_X,
            CONTENT_SETTINGS.OFFSET_Y,
            dimensions.CONTENT_WIDTH,
            dimensions.CONTENT_HEIGHT
        );
        this.contentBorder.setStrokeStyle({
            width: BASE_SETTINGS.STROKE_WIDTH,
            color: BASE_SETTINGS.STROKE_COLOR,
        });
        this.contentBorder.stroke();
        // this.contentBorder.fill("yellow"); // for debugging
    }

    setupEventHandlers() {
        this.content.addEventListener("pointerdown", (event) =>
            this.onContentClick(event)
        );
        this.decreaseSpawnBtn.addEventListener("click", () =>
            this.onDecreaseSpawnClick()
        );
        this.increaseSpawnBtn.addEventListener("click", () =>
            this.onIncreaseSpawnClick()
        );
        this.decreaseGravityBtn.addEventListener("click", () =>
            this.onDecreaseGravityClick()
        );
        this.increaseGravityBtn.addEventListener("click", () =>
            this.onIncreaseGravityClick()
        );

        window.addEventListener("resize", () => this.onWindowResize());
    }

    onContentClick(event) {
        if (event.target !== this.content) return;
        this.emit(CUSTOM_EVENTS.ADD_SHAPE, event);
    }

    onDecreaseSpawnClick() {
        this.emit(CUSTOM_EVENTS.DECREASE_SPAWN_AMOUNT);
    }

    onIncreaseSpawnClick() {
        this.emit(CUSTOM_EVENTS.INCREASE_SPAWN_AMOUNT);
    }

    onDecreaseGravityClick() {
        this.emit(CUSTOM_EVENTS.DECREASE_GRAVITY);
    }

    onIncreaseGravityClick() {
        this.emit(CUSTOM_EVENTS.INCREASE_GRAVITY);
    }

    onWindowResize() {
        this.emit(CUSTOM_EVENTS.WINDOW_RESIZE);
    }

    updateSpawnAmountElText(value) {
        const word = value > 1 ? "shapes" : "shape";

        this.spawnAmountEl.textContent = `${value} ${word}/sec`;
        this.emit(CUSTOM_EVENTS.SPAWN_AMOUNT_UPDATED);
    }

    updateGravityElText(value) {
        this.gravityEl.textContent = value;
    }

    handleShapeAdded(shape) {
        shape.graphics.on("pointerdown", () => {
            this.emit(CUSTOM_EVENTS.REMOVE_SHAPE, shape);
        });
        this.content.addChild(shape.graphics);
    }

    handleShapeRemoved(shape) {
        shape.graphics.off("pointerdown");
        this.content.removeChild(shape.graphics);
    }

    updateShapesText(value) {
        this.shapesText.text = `Shapes: ${value}`;
    }

    updateAreaText(value) {
        this.areaText.text = `Area: ${Math.round(value)} px²`;
    }

    resizeHeader(dimensions) {
        this.drawHeaderElements(dimensions);
    }

    resizeContent(dimensions) {
        this.drawContentElements(dimensions);
    }

    onViewUpdate() {
        this.emit(CUSTOM_EVENTS.SHAPES_Y_UPDATE);
    }
}
