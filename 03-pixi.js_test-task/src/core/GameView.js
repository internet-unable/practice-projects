import { EventEmitter } from "pixi.js";
import { Container, Rectangle, Graphics, Text } from "pixi.js";
import {
    BASE_SETTINGS,
    HEADER_SETTINGS,
    SHAPES_SETTINGS,
    AREA_SETTINGS,
    CONTENT_SETTINGS,
} from "../utils/constants";

export default class GameView extends EventEmitter {
    constructor(gameBoard, dimensions) {
        super();
        this.gameBoard = gameBoard;
        this.dimensions = dimensions;

        this.initializeUI();
        this.getControlElements();
        this.setupEventHandlers();
    }

    initializeUI() {
        // this.main = new Container();
        // this.header = new Container();
        // this.content = new Container();

        // this.header.sortableChildren = true;
        // this.header.zIndex = HEADER_SETTINGS.Z_INDEX;

        // this.content.sortableChildren = true;
        // this.content.interactive = true;

        // this.gameBoard.stage.addChild(this.main);
        // this.main.addChild(this.header);
        // this.main.addChild(this.content);

        // this.createHeaderElements();
        // this.createContentElements();

        this.initializeMain();
        this.initializeHeader();
        this.initializeContent();
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
        // this.gameBoard.stage.addChild(this.header);

        this.createHeaderElements();
    }

    initializeContent() {
        this.content = new Container();
        this.content.sortableChildren = true;
        this.content.interactive = true;
        this.main.addChild(this.content);
        // this.gameBoard.stage.addChild(this.content);

        this.createContentElements();
    }

    createHeaderElements() {
        // this.headerBorder = new Graphics();
        // this.headerBg = new Graphics();

        // this.shapesBorder = new Graphics();
        // this.shapesText = new Text({
        //     text: `Shapes: 0`,
        //     style: {
        //         fill: BASE_SETTINGS.TEXT_COLOR,
        //         fontSize: BASE_SETTINGS.FONT_SIZE,
        //     },
        // });

        // this.areaBorder = new Graphics();
        // this.areaText = new Text({
        //     text: `Area: 0 px²`,
        //     style: {
        //         fill: BASE_SETTINGS.TEXT_COLOR,
        //         fontSize: BASE_SETTINGS.FONT_SIZE,
        //     },
        // });

        // this.header.addChild(this.headerBorder);
        // this.header.addChild(this.headerBg);
        // this.header.addChild(this.shapesBorder);
        // this.header.addChild(this.shapesText);
        // this.header.addChild(this.areaBorder);
        // this.header.addChild(this.areaText);

        // this.drawHeaderElements(this.dimensions);

        // this.createHeaderBorder();
        this.createHeaderBg();
        this.createShapesBorderAndText();
        this.createAreaBorderAndText();

        this.drawHeaderElements(this.dimensions);
    }

    createHeaderBorder() {
        this.headerBorder = new Graphics();
        this.header.addChild(this.headerBorder);
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
        // this.content.addChild(this.contentBorder);

        this.drawContentElements(this.dimensions);
    }

    drawHeaderElements(dimensions) {
        // this.headerBorder.clear();
        // this.headerBorder.rect(
        //     0,
        //     1,
        //     dimensions.HEADER_WIDTH - 2,
        //     HEADER_SETTINGS.HEIGHT - 2
        // );
        // this.headerBorder.setStrokeStyle({
        //     width: BASE_SETTINGS.STROKE_WIDTH,
        //     color: BASE_SETTINGS.STROKE_COLOR,
        // });
        // this.headerBorder.stroke();

        // this.headerBg.clear();
        // this.headerBg.rect(
        //     0,
        //     0,
        //     dimensions.HEADER_WIDTH,
        //     HEADER_SETTINGS.HEIGHT - 2
        // );
        // this.headerBg.fill("white");
        // // this.headerBg.fill("cyan"); // for debugging

        // this.shapesBorder.clear();
        // this.shapesBorder.rect(
        //     SHAPES_SETTINGS.OFFSET_X,
        //     SHAPES_SETTINGS.OFFSET_Y,
        //     SHAPES_SETTINGS.WIDTH,
        //     SHAPES_SETTINGS.HEIGHT - 2
        // );
        // this.shapesBorder.setStrokeStyle({
        //     width: BASE_SETTINGS.STROKE_WIDTH,
        //     color: BASE_SETTINGS.STROKE_COLOR,
        // });
        // this.shapesBorder.stroke();

        // this.shapesText.position.set(
        //     SHAPES_SETTINGS.TEXT_OFFSET_X,
        //     SHAPES_SETTINGS.TEXT_OFFSET_Y
        // );

        // this.areaBorder.clear();
        // this.areaBorder.rect(
        //     AREA_SETTINGS.OFFSET_X,
        //     AREA_SETTINGS.OFFSET_Y,
        //     AREA_SETTINGS.WIDTH,
        //     AREA_SETTINGS.HEIGHT -2
        // );
        // this.areaBorder.setStrokeStyle({
        //     width: BASE_SETTINGS.STROKE_WIDTH,
        //     color: BASE_SETTINGS.STROKE_COLOR,
        // });
        // this.areaBorder.stroke();

        // this.areaText.position.set(
        //     AREA_SETTINGS.TEXT_OFFSET_X,
        //     AREA_SETTINGS.TEXT_OFFSET_Y
        // );

        this.drawHeaderBorder(dimensions);
        this.drawHeaderBg(dimensions);
        this.drawShapesBorderAndText();
        this.drawAreaBorderAndText();
    }

    drawHeaderBorder(dimensions) {
        // this.headerBorder.clear();
        // this.headerBorder.rect(
        //     0,
        //     1,
        //     dimensions.HEADER_WIDTH,
        //     HEADER_SETTINGS.HEIGHT - 2
        // );
        // this.headerBorder.setStrokeStyle({
        //     width: BASE_SETTINGS.STROKE_WIDTH,
        //     color: BASE_SETTINGS.STROKE_COLOR,
        // });
        // this.headerBorder.stroke();
    }

    drawHeaderBg(dimensions) {
        this.headerBg.clear();
        this.headerBg.rect(
            0,
            0,
            dimensions.HEADER_WIDTH,
            HEADER_SETTINGS.HEIGHT - 2
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
            SHAPES_SETTINGS.HEIGHT - 2
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
            AREA_SETTINGS.HEIGHT - 2
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
        // this.content.hitArea = new Rectangle(
        //     CONTENT_SETTINGS.OFFSET_X,
        //     CONTENT_SETTINGS.OFFSET_Y,
        //     dimensions.CONTENT_WIDTH,
        //     dimensions.CONTENT_HEIGHT
        // );

        // this.contentBorder.clear();
        // this.contentBorder.rect(
        //     1,
        //     29,
        //     dimensions.CANVAS_WIDTH - 2,
        //     dimensions.CANVAS_HEIGHT - 30
        // );
        // this.contentBorder.setStrokeStyle({
        //     width: BASE_SETTINGS.STROKE_WIDTH,
        //     color: BASE_SETTINGS.STROKE_COLOR,
        // });
        // this.contentBorder.stroke();
        // // this.contentBorder.fill("yellow"); // for debugging

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
            1,
            29,
            dimensions.CANVAS_WIDTH - 2,
            dimensions.CANVAS_HEIGHT - 30
        );
        this.contentBorder.setStrokeStyle({
            width: BASE_SETTINGS.STROKE_WIDTH,
            color: BASE_SETTINGS.STROKE_COLOR,
        });
        this.contentBorder.stroke();
        // this.contentBorder.fill("yellow"); // for debugging
    }

    setSpawnRateText(value) {
        this.spawnRateEl.textContent = value;
    }

    setGravityText(value) {
        this.gravityEl.textContent = value;
    }

    getControlElements() {
        this.spawnRateEl = document.getElementById(BASE_SETTINGS.CTRL_SPAWN_EL);
        this.gravityEl = document.getElementById(BASE_SETTINGS.CTRL_GRAVITY_EL);
    }

    setupEventHandlers() {
        this.handleContentClick();
        this.handleDecreaseSpawnClick();
        this.handleIncreaseSpawnClick();
        this.handleDecreaseGravityClick();
        this.handleIncreaseGravityClick();
    }

    handleContentClick() {
        this.content.addEventListener("pointerdown", (event) => {
            if (event.target !== this.content) return;

            this.emit("addShape", event);
        });
    }

    handleDecreaseSpawnClick() {
        document.getElementById(BASE_SETTINGS.CTRL_DECREASE_SPAWN).addEventListener("click", () =>
            this.emit("decreaseSpawn")
        );
    }

    handleIncreaseSpawnClick() {
        document.getElementById(BASE_SETTINGS.CTRL_INCREASE_SPAWN).addEventListener("click", () =>
            this.emit("increaseSpawn")
        );
    }

    handleDecreaseGravityClick() {
        document.getElementById(BASE_SETTINGS.CTRL_DECREASE_GRAVITY).addEventListener("click", () =>
            this.emit("decreaseGravity")
        );
    }

    handleIncreaseGravityClick() {
        document.getElementById(BASE_SETTINGS.CTRL_INCREASE_GRAVITY).addEventListener("click", () =>
            this.emit("increaseGravity")
        );
    }

    resize(dimensions) {
        this.drawHeaderElements(dimensions);
        this.drawContentElements(dimensions);
    }

    render(model) {
        model.shapes.forEach((shape) => {
            this.content.addChild(shape.graphics);
        });

        this.shapesText.text = `Shapes: ${model.visibleShapesCount}`;
        this.areaText.text = `Area: ${Math.round(model.totalArea)} px²`;
    }
}
