import { Container, Rectangle, Graphics, Text } from "pixi.js";
import { BASE_SETTINGS, HEADER_SETTINGS, SHAPES_SETTINGS, AREA_SETTINGS, CONTENT_SETTINGS } from "../utils/constants";

export default class GameView {
    constructor(gameBoard, dimensions) {
        this.gameBoard = gameBoard;
        this.dimensions = dimensions;

        this.initializeUI();
        this.getControlElements();
    }

    initializeUI() {
        this.header = new Container();
        this.content = new Container();

        this.header.sortableChildren = true;
        this.header.zIndex = HEADER_SETTINGS.Z_INDEX;

        this.content.sortableChildren = true;
        this.content.interactive = true;

        this.gameBoard.stage.addChild(this.header);
        this.gameBoard.stage.addChild(this.content);

        this.createHeaderElements();
        this.createContentElements();
    }

    createHeaderElements() {
        this.headerBg = new Graphics();

        this.shapesBorder = new Graphics();
        this.shapesText = new Text({
            text: `Shapes: 0`,
            style: {
                fill: BASE_SETTINGS.TEXT_COLOR,
                fontSize: BASE_SETTINGS.FONT_SIZE,
            },
        });

        this.areaBorder = new Graphics();
        this.areaText = new Text({
            text: `Area: 0 px²`,
            style: {
                fill: BASE_SETTINGS.TEXT_COLOR,
                fontSize: BASE_SETTINGS.FONT_SIZE,
            },
        });

        this.header.addChild(this.headerBg);
        this.header.addChild(this.shapesBorder);
        this.header.addChild(this.shapesText);
        this.header.addChild(this.areaBorder);
        this.header.addChild(this.areaText);

        this.drawHeaderElements(this.dimensions);
    }

    createContentElements() {
        this.contentBorder = new Graphics();
        this.content.addChild(this.contentBorder);

        this.drawContentElements(this.dimensions);
    }

    drawHeaderElements(dimensions) {
        this.headerBg.clear();
        this.headerBg.rect(0, 0, dimensions.HEADER_WIDTH, HEADER_SETTINGS.HEIGHT);
        this.headerBg.fill("white");
        // this.headerBg.fill("cyan");

        this.shapesBorder.clear();
        this.shapesBorder.rect(
            SHAPES_SETTINGS.OFFSET_X,
            SHAPES_SETTINGS.OFFSET_Y,
            SHAPES_SETTINGS.WIDTH,
            SHAPES_SETTINGS.HEIGHT
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

        this.areaBorder.clear();
        this.areaBorder.rect(
            AREA_SETTINGS.OFFSET_X,
            AREA_SETTINGS.OFFSET_Y,
            AREA_SETTINGS.WIDTH,
            AREA_SETTINGS.HEIGHT
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
        this.content.hitArea = new Rectangle(
            CONTENT_SETTINGS.OFFSET_X,
            CONTENT_SETTINGS.OFFSET_Y,
            dimensions.CONTENT_WIDTH,
            dimensions.CONTENT_HEIGHT
        );

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
        // this.contentBorder.fill("yellow");
    }

    setSpawnRateText(value) {
        this.spawnRateEl.textContent = value;
    }

    setGravityText(value) {
        this.gravityEl.textContent = value;
    }

    getControlElements() {
        this.decreaseSpawnBtn = BASE_SETTINGS.CTRL_DECREASE_SPAWN;
        this.increaseSpawnBtn = BASE_SETTINGS.CTRL_INCREASE_SPAWN;
        this.decreaseGravityBtn = BASE_SETTINGS.CTRL_DECREASE_GRAVITY;
        this.increaseGravityBtn = BASE_SETTINGS.CTRL_INCREASE_GRAVITY;

        this.spawnRateEl = BASE_SETTINGS.CTRL_SPAWN_EL;
        this.gravityEl = BASE_SETTINGS.CTRL_GRAVITY_EL;
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
