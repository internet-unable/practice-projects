import { Application, Container, Rectangle, Graphics, Text } from "pixi.js";

import Triangle from "./shapes/Triangle";
import Square from "./shapes/Square";
import Pentagon from "./shapes/Pentagon";
import Hexagon from "./shapes/Hexagon";
import Ellipse from "./shapes/Ellipse";
import Star from "./shapes/Star";
import Circle from "./shapes/Circle";

import "./style.css";

const SHAPES = [Triangle, Square, Pentagon, Hexagon, Ellipse, Star, Circle];
const BASE_STROKE_WIDTH = 2;
const BASE_STROKE_COLOR = "black";
const BASE_TEXT_COLOR = "black";
const BASE_FONT_SIZE = 18;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CANVAS_BG_COLOR = "white";

const HEADER_WIDTH = CANVAS_WIDTH;
const HEADER_HEIGHT = 30;
const HEADER_Z_INDEX = 1;

const SHAPES_WIDTH = 170;
const SHAPES_HEIGHT = HEADER_HEIGHT;
const SHAPES_OFFSET_X = BASE_STROKE_WIDTH / 2;
const SHAPES_OFFSET_Y = BASE_STROKE_WIDTH / 2;
const SHAPES_TEXT_OFFSET_X = 10 + BASE_STROKE_WIDTH / 2;
const SHAPES_TEXT_OFFSET_Y = 5 + BASE_STROKE_WIDTH / 2;

const AREA_WIDTH = 170;
const AREA_HEIGHT = HEADER_HEIGHT;
const AREA_OFFSET_X = SHAPES_WIDTH + BASE_STROKE_WIDTH / 2;
const AREA_OFFSET_Y = BASE_STROKE_WIDTH / 2;
const AREA_TEXT_OFFSET_X = AREA_WIDTH + 10 + BASE_STROKE_WIDTH / 2;
const AREA_TEXT_OFFSET_Y = 5 + BASE_STROKE_WIDTH / 2;

const CONTENT_WIDTH = CANVAS_WIDTH - BASE_STROKE_WIDTH;
const CONTENT_HEIGHT = CANVAS_HEIGHT - HEADER_HEIGHT - BASE_STROKE_WIDTH;
const CONTENT_OFFSET_X = BASE_STROKE_WIDTH / 2;
const CONTENT_OFFSET_Y = HEADER_HEIGHT + BASE_STROKE_WIDTH / 2;

// Todo: should be canvas_width - largest figure in width
const EXPERIMENTAL_VALUE = CANVAS_WIDTH - 50;
// const OFFSET_Y = Number(`-${HEADER_HEIGHT}`);
// const OFFSET_Y = HEADER_HEIGHT;
const OFFSET_Y = 0;

const GRAVITY = 1;
const SPAWN_RATE = 10000;

(async () => {
    // === ИНИЦИАЛИЗАЦИЯ PIXI === //
    const entry = document.getElementById("app");
    const app = new Application();
    await app.init({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        background: CANVAS_BG_COLOR,
        // resizeTo: window
    });
    entry.appendChild(app.canvas);

    // === MODEL (МОДЕЛЬ) === //
    class GameModel {
        constructor() {
            this.shapes = [];
            this.totalArea = 0;
            this.visibleShapesCount = 0;
            this.spawnRate = SPAWN_RATE;
            this.gravity = GRAVITY;
        }

        addShape(shape) {
            this.shapes.push(shape);
            this.updateVisibleShapes();
        }

        removeShape(shape) {
            shape.destroy();
            this.shapes = this.shapes.filter((s) => s !== shape);
            this.updateVisibleShapes();
        }

        updateVisibleShapes() {
            let count = 0;
            let totalArea = 0;
            this.shapes.forEach((shape) => {
                if (shape.isVisibleInContent(CONTENT_OFFSET_Y)) {
                    count++;
                    totalArea += shape.getArea();
                }
            });

            this.visibleShapesCount = count;
            this.totalArea = totalArea;
        }

        removeOutOfBoundsShapes() {
            this.shapes = this.shapes.filter((shape) => {
                if (shape.y > CANVAS_HEIGHT) {
                    this.removeShape(shape);
                    return false;
                }
                return true;
            });

            this.updateVisibleShapes();
        }

        update() {
            this.shapes.forEach((shape) => shape.update(this.gravity));
            this.removeOutOfBoundsShapes();
            this.updateVisibleShapes();
        }
    }

    // === VIEW (ПРЕДСТАВЛЕНИЕ) === //
    class GameView {
        constructor(app, model) {
            this.app = app;
            this.model = model;

            this.createHeader();
            this.createHeaderBg();

            this.createShapesBorder();
            this.createShapesText();

            this.createAreaBorder();
            this.createAreaText();

            this.createContent();
            this.createContentBorder();
        }

        createHeader() {
            this.header = new Container();
            this.header.sortableChildren = true;
            this.header.zIndex = HEADER_Z_INDEX;

            this.app.stage.addChild(this.header);
        }

        createHeaderBg() {
            const headerBg = new Graphics();
            headerBg.clear();
            headerBg.rect(0, 0, HEADER_WIDTH, HEADER_HEIGHT);
            headerBg.fill("cyan");

            this.header.addChild(headerBg);
        }

        createShapesBorder() {
            const shapesBorder = new Graphics();
            shapesBorder.clear();
            shapesBorder.rect(
                SHAPES_OFFSET_X,
                SHAPES_OFFSET_Y,
                SHAPES_WIDTH,
                SHAPES_HEIGHT
            );
            shapesBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            shapesBorder.stroke();

            this.header.addChild(shapesBorder);
        }

        createShapesText() {
            this.shapesText = new Text({
                text: `Shapes: 0`,
                style: {
                    fill: BASE_TEXT_COLOR,
                    fontSize: BASE_FONT_SIZE,
                },
            });

            this.shapesText.position.set(
                SHAPES_TEXT_OFFSET_X,
                SHAPES_TEXT_OFFSET_Y
            );

            this.header.addChild(this.shapesText);
        }

        createAreaBorder() {
            const areaBorder = new Graphics();
            areaBorder.clear();
            areaBorder.rect(
                AREA_OFFSET_X,
                AREA_OFFSET_Y,
                AREA_WIDTH,
                AREA_HEIGHT
            );
            areaBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            areaBorder.stroke();

            this.header.addChild(areaBorder);
        }

        createAreaText() {
            this.areaText = new Text({
                text: `Area: 0 px²`,
                style: {
                    fill: BASE_TEXT_COLOR,
                    fontSize: BASE_FONT_SIZE,
                },
            });

            this.areaText.position.set(AREA_TEXT_OFFSET_X, AREA_TEXT_OFFSET_Y);

            this.header.addChild(this.areaText);
        }

        createContent() {
            this.content = new Container();
            this.content.sortableChildren = true;
            this.content.interactive = true;
            this.content.hitArea = new Rectangle(
                CONTENT_OFFSET_X,
                CONTENT_OFFSET_Y,
                CANVAS_WIDTH,
                CANVAS_HEIGHT
            );

            this.app.stage.addChild(this.content);
        }

        createContentBorder() {
            const contentBorder = new Graphics();
            contentBorder.clear();
            contentBorder.rect(
                CONTENT_OFFSET_X,
                CONTENT_OFFSET_Y,
                CONTENT_WIDTH,
                CONTENT_HEIGHT
            );
            contentBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            contentBorder.stroke();
            contentBorder.fill("yellow");

            this.content.addChild(contentBorder);
        }

        render() {
            this.model.shapes.forEach((shape) =>{
                // console.log(shape.y);
                this.content.addChild(shape.graphics)
            });

            this.shapesText.text = `Shapes: ${this.model.visibleShapesCount}`;
            this.areaText.text = `Area: ${Math.round(
                this.model.totalArea
            )} px²`;
        }
    }

    // === CONTROLLER (КОНТРОЛЛЕР) === //
    class GameController {
        constructor(model, view) {
            this.model = model;
            this.view = view;
            this.spawnLoop = null;

            app.ticker.add(() => this.update());
            this.handleContentPointerDown();
            this.createControlButtons();
            this.startSpawning();
        }

        startSpawning() {
            // if (this.spawnLoop) clearInterval(this.spawnLoop); // Удаляем старый интервал

            // this.spawnLoop = setInterval(() => {
            //     this.addShape(Math.random() * EXPERIMENTAL_VALUE, OFFSET_Y);
            // }, this.model.spawnRate);
        }

        handleContentPointerDown() {
            this.view.content.onpointerdown = (event) => {
                if (event.target !== this.view.content) return;
                this.addShape(event.data.global.x, event.data.global.y - HEADER_HEIGHT);
            };
        }

        addShape(x, y) {
            // const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            // const shape = new ShapeClass(x, y);
            // const shape = new Hexagon(x, y);
            const shape = new Square(x, y);

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

        createControlButtons() {
            const controls = document.createElement("div");
            controls.style.textAlign = "center";
            controls.style.marginTop = "20px";

            controls.innerHTML = `
        <div>
          <button id="decreaseSpawn">-</button>
          Spawn Rate: <span id="spawnRate">${this.model.spawnRate}</span> ms
          <button id="increaseSpawn">+</button>
        </div>
        <div>
          <button id="decreaseGravity">-</button>
          Gravity: <span id="gravity">${this.model.gravity}</span>
          <button id="increaseGravity">+</button>
        </div>
      `;

            document.body.appendChild(controls);

            document.getElementById("decreaseSpawn").onclick = () => {
                this.model.spawnRate = Math.max(
                    200,
                    this.model.spawnRate - 200
                );
                document.getElementById("spawnRate").textContent =
                    this.model.spawnRate;
                this.startSpawning();
            };

            document.getElementById("increaseSpawn").onclick = () => {
                this.model.spawnRate += 200;
                document.getElementById("spawnRate").textContent =
                    this.model.spawnRate;
                this.startSpawning();
            };

            document.getElementById("decreaseGravity").onclick = () => {
                this.model.gravity = Math.max(1, this.model.gravity - 1);
                document.getElementById("gravity").textContent =
                    this.model.gravity;
            };

            document.getElementById("increaseGravity").onclick = () => {
                this.model.gravity += 1;
                document.getElementById("gravity").textContent =
                    this.model.gravity;
            };
        }
    }

    // === ЗАПУСК ИГРЫ === //
    const model = new GameModel();
    const view = new GameView(app, model);
    const controller = new GameController(model, view);
})();
