import { Application, Container, Rectangle, Graphics, Text } from "pixi.js";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 660;
const CANVAS_BG_COLOR = "white";

const BASE_STROKE_WIDTH = 2;
const BASE_STROKE_COLOR = "black";
const BASE_TEXT_COLOR = "black";
const BASE_FONT_SIZE = 18;

const HEADER_HEIGHT = 60;
const HEADER_Z_INDEX = 1;

const HEADER_SHAPES_CONTAINER_WIDTH = 170;
const HEADER_SHAPES_CONTAINER_HEIGHT = 30;
const HEADER_SHAPES_CONTAINER_OFFSET_X = BASE_STROKE_WIDTH / 2;
const HEADER_SHAPES_CONTAINER_OFFSET_Y =
    HEADER_SHAPES_CONTAINER_HEIGHT + BASE_STROKE_WIDTH / 2;
const HEADER_SHAPES_TEXT_OFFSET_X = 10 + BASE_STROKE_WIDTH / 2;
const HEADER_SHAPES_TEXT_OFFSET_Y =
    HEADER_SHAPES_CONTAINER_HEIGHT + 5 + BASE_STROKE_WIDTH / 2;

const HEADER_AREA_CONTAINER_WIDTH = 170;
const HEADER_AREA_CONTAINER_HEIGHT = 30;
const HEADER_AREA_CONTAINER_OFFSET_X =
    HEADER_SHAPES_CONTAINER_WIDTH + BASE_STROKE_WIDTH / 2;
const HEADER_AREA_CONTAINER_OFFSET_Y =
    HEADER_AREA_CONTAINER_HEIGHT + BASE_STROKE_WIDTH / 2;
const HEADER_AREA_TEXT_OFFSET_X =
    HEADER_AREA_CONTAINER_WIDTH + 10 + BASE_STROKE_WIDTH / 2;
const HEADER_AREA_TEXT_OFFSET_Y =
    HEADER_AREA_CONTAINER_HEIGHT + 5 + BASE_STROKE_WIDTH / 2;

const BODY_CONTAINER_WIDTH = CANVAS_WIDTH - BASE_STROKE_WIDTH;
const BODY_CONTAINER_HEIGHT = CANVAS_HEIGHT - HEADER_HEIGHT - BASE_STROKE_WIDTH;
const BODY_CONTAINER_OFFSET_X = BASE_STROKE_WIDTH / 2;
const BODY_CONTAINER_OFFSET_Y = HEADER_HEIGHT + BASE_STROKE_WIDTH / 2;

(async () => {
    // === ИНИЦИАЛИЗАЦИЯ PIXI === //
    const app = new Application();
    await app.init({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        background: CANVAS_BG_COLOR,
    });
    document.body.appendChild(app.canvas);

    // === MODEL (МОДЕЛЬ) === //
    class Shape {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color || Math.random() * 0xffffff;
            this.graphics = new Graphics();
            this.draw();
        }

        draw() {
            this.graphics.clear();
            this.graphics.setFillStyle(this.color);
        }

        update(gravity) {
            this.y += gravity;
            this.graphics.y = this.y;
        }

        destroy() {
            this.graphics.destroy();
        }
    }

    class Square extends Shape {
        draw() {
            super.draw();
            this.graphics.rect(this.x, this.y, 40, 40);
            this.graphics.fill();
        }
    }

    class Circle extends Shape {
        draw() {
            super.draw();
            this.graphics.circle(this.x + 20, this.y + 20, 20);
            this.graphics.fill();
        }
    }

    class Triangle extends Shape {
        draw() {
            super.draw();
            this.graphics.poly([
                this.x,
                this.y + 40,
                this.x + 20,
                this.y,
                this.x + 40,
                this.y + 40,
            ]);
            this.graphics.fill();
        }
    }

    class GameModel {
        constructor() {
            this.shapes = [];
            this.gravity = 2;
            this.spawnRate = 1000;
            this.totalArea = 0;
        }

        addShape(shape) {
            this.shapes.push(shape);
            this.updateArea();
        }

        removeShape(shape) {
            shape.destroy();
            this.shapes = this.shapes.filter((s) => s !== shape);
            this.updateArea();
        }

        updateArea() {
            this.totalArea = this.shapes.reduce(
                (sum, shape) =>
                    sum +
                    (shape instanceof Square
                        ? 1600
                        : shape instanceof Circle
                        ? Math.PI * 400
                        : 800),
                0
            );
        }

        update() {
            this.shapes.forEach((shape) => shape.update(this.gravity));
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
            headerBg.rect(0, 0, CANVAS_WIDTH, HEADER_HEIGHT);
            headerBg.fill();

            this.header.addChild(headerBg);
        }

        createShapesBorder() {
            const shapesBorder = new Graphics();
            shapesBorder.clear();
            shapesBorder.rect(
                HEADER_SHAPES_CONTAINER_OFFSET_X,
                HEADER_SHAPES_CONTAINER_OFFSET_Y,
                HEADER_SHAPES_CONTAINER_WIDTH,
                HEADER_SHAPES_CONTAINER_HEIGHT
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
                HEADER_SHAPES_TEXT_OFFSET_X,
                HEADER_SHAPES_TEXT_OFFSET_Y
            );

            this.header.addChild(this.shapesText);
        }

        createAreaBorder() {
            const areaBorder = new Graphics();
            areaBorder.clear();
            areaBorder.rect(
                HEADER_AREA_CONTAINER_OFFSET_X,
                HEADER_AREA_CONTAINER_OFFSET_Y,
                HEADER_AREA_CONTAINER_WIDTH,
                HEADER_AREA_CONTAINER_HEIGHT
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

            this.areaText.position.set(
                HEADER_AREA_TEXT_OFFSET_X,
                HEADER_AREA_TEXT_OFFSET_Y
            );

            this.header.addChild(this.areaText);
        }

        createContent() {
            this.content = new Container();
            this.content.sortableChildren = true;
            this.content.interactive = true;
            this.content.hitArea = new Rectangle(
                0,
                0,
                CANVAS_WIDTH,
                CANVAS_HEIGHT - HEADER_HEIGHT
            );

            this.app.stage.addChild(this.content);
        }

        createContentBorder() {
            const bodyBorder = new Graphics();
            bodyBorder.clear();
            bodyBorder.rect(
                BODY_CONTAINER_OFFSET_X,
                BODY_CONTAINER_OFFSET_Y,
                BODY_CONTAINER_WIDTH,
                BODY_CONTAINER_HEIGHT
            );
            bodyBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            bodyBorder.stroke();

            this.content.addChild(bodyBorder);
        }

        render() {
            // this.container.removeChildren(3); // Оставляем текстовые блоки и рамки
            this.model.shapes.forEach((shape) =>
                this.container.addChild(shape.graphics)
            );

            // this.textShapes.text = `Shapes: ${this.model.shapes.length}`;
            // this.textArea.text = `Area: ${Math.round(this.model.totalArea)} px²`;
        }
    }

    // === CONTROLLER (КОНТРОЛЛЕР) === //
    class GameController {
        constructor(model, view) {
            this.model = model;
            this.view = view;

            // this.view.container.interactive = true;
            // this.view.container.onpointerdown = (event) =>
            //     this.addShape(event.data.global.x, event.data.global.y);

            app.ticker.add(() => this.update());

            setInterval(
                () => this.addShape(Math.random() * 760, -50),
                this.model.spawnRate
            );

            this.createControlButtons();
        }

        addShape(x, y) {
            const ShapeClass = [Square, Circle, Triangle][
                Math.floor(Math.random() * 3)
            ];
            const shape = new ShapeClass(x, y);
            shape.graphics.interactive = true;
            shape.graphics.onpointerdown = (event) => {
                event.stopPropagation();
                this.removeShape(shape);
            };
            this.model.addShape(shape);
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
            };

            document.getElementById("increaseSpawn").onclick = () => {
                this.model.spawnRate += 200;
                document.getElementById("spawnRate").textContent =
                    this.model.spawnRate;
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
