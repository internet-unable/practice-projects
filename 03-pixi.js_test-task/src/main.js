import { Application, Container, Rectangle, Graphics, Text } from "pixi.js";

import Circle from "./shapes/Circle";
import Ellipse from "./shapes/Ellipse";
import Hexagon from "./shapes/Hexagon";
import Pentagon from "./shapes/Pentagon";
import RandomIrregularShape from "./shapes/RandomIrregularShape";
import Square from "./shapes/Square";
import Star from "./shapes/Star";
import Triangle from "./shapes/Triangle";

import "./style.css";

const SHAPES = [
    Circle,
    Ellipse,
    Hexagon,
    Pentagon,
    /*RandomIrregularShape,*/ Square,
    Star,
    Triangle,
];
const BASE_CANVAS_WIDTH = 800;
const BASE_CANVAS_HEIGHT = 600;
const BASE_STROKE_WIDTH = 2;
const BASE_STROKE_COLOR = "black";
const BASE_TEXT_COLOR = "black";
const BASE_FONT_SIZE = 18;
const BASE_ENTRY_PADDING = 20;

const HEADER_HEIGHT = 30;
const HEADER_Z_INDEX = 1;
const SHAPES_WIDTH = 105;
const AREA_WIDTH = 140;

const OFFSET_Y = 0;
const GRAVITY = 1;
const SPAWN_RATE = 2000;

// Функция для получения размеров устройства
function getDeviceDimensions() {
    const width = Math.min(
        window.innerWidth - BASE_ENTRY_PADDING * 2,
        BASE_CANVAS_WIDTH
    );
    const height = Math.min(
        window.innerHeight - 80 - BASE_ENTRY_PADDING * 2,
        BASE_CANVAS_HEIGHT
    ); // Учитываем пространство для элементов управления
    return { width, height };
}

// Базовые размеры, которые будут меняться в зависимости от размера устройства
let { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } = getDeviceDimensions();
const CANVAS_BG_COLOR = "white";

// Расчет размеров элементов интерфейса
function calculateDimensions() {
    const { width, height } = getDeviceDimensions();
    CANVAS_WIDTH = width;
    CANVAS_HEIGHT = height;

    // Изменяем размеры в зависимости от ширины экрана
    // const SHAPES_WIDTH = Math.min(width * 0.3, 130);
    // const AREA_WIDTH = Math.min(width * 0.3, 150);

    return {
        HEADER_WIDTH: width,
        HEADER_HEIGHT,

        SHAPES_WIDTH,
        SHAPES_HEIGHT: HEADER_HEIGHT,
        SHAPES_OFFSET_X: BASE_STROKE_WIDTH / 2,
        SHAPES_OFFSET_Y: BASE_STROKE_WIDTH / 2,
        SHAPES_TEXT_OFFSET_X: 5 + BASE_STROKE_WIDTH / 2,
        SHAPES_TEXT_OFFSET_Y: 5 + BASE_STROKE_WIDTH / 2,

        AREA_WIDTH,
        AREA_HEIGHT: HEADER_HEIGHT,
        AREA_OFFSET_X: SHAPES_WIDTH + BASE_STROKE_WIDTH / 2,
        AREA_OFFSET_Y: BASE_STROKE_WIDTH / 2,
        AREA_TEXT_OFFSET_X: 5 + SHAPES_WIDTH + BASE_STROKE_WIDTH / 2,
        AREA_TEXT_OFFSET_Y: 5 + BASE_STROKE_WIDTH / 2,

        CONTENT_WIDTH: width - BASE_STROKE_WIDTH,
        CONTENT_HEIGHT: height - HEADER_HEIGHT - BASE_STROKE_WIDTH,
        CONTENT_OFFSET_X: BASE_STROKE_WIDTH / 2,
        CONTENT_OFFSET_Y: HEADER_HEIGHT + BASE_STROKE_WIDTH / 2,

        EXPERIMENTAL_VALUE: width - 50,
    };
}

let dimensions = calculateDimensions();

// Добавляем прослушиватель событий для перерасчета размеров при изменении размера окна
// window.addEventListener('resize', () => {
//     dimensions = calculateDimensions();
//     console.log(dimensions);
//     if (gameApp) {
//         gameApp.renderer.resize(CANVAS_WIDTH, CANVAS_HEIGHT);
//         // Обновляем представление, если оно существует
//         if (gameView) gameView.resize(dimensions);
//     }
// });

window.addEventListener("resize", () => {
    // Сохраняем прежние размеры для вычисления пропорций
    const oldWidth = CANVAS_WIDTH;
    const oldHeight = CANVAS_HEIGHT;

    // Обновляем размеры
    dimensions = calculateDimensions();

    // Вычисляем коэффициенты масштабирования
    const scaleX = dimensions.CONTENT_WIDTH / (oldWidth - BASE_STROKE_WIDTH);
    const scaleY =
        dimensions.CONTENT_HEIGHT /
        (oldHeight - HEADER_HEIGHT - BASE_STROKE_WIDTH);

    if (gameApp) {
        // Изменяем размер холста
        gameApp.renderer.resize(CANVAS_WIDTH, CANVAS_HEIGHT);

        // Обновляем представление, если оно существует
        if (gameView) {
            // Обновляем UI
            gameView.resize(dimensions);

            // Обновляем позиции фигур
            gameView.adjustShapesPositions(scaleX, scaleY);
        }
    }
});

// Добавим переменные для отслеживания касаний
let touchStartX = 0;
let touchStartY = 0;
let isTouching = false;

let gameApp, gameModel, gameView, gameController;

(async () => {
    // === ИНИЦИАЛИЗАЦИЯ PIXI === //
    const entry = document.getElementById("app");
    entry.style.padding = `${BASE_ENTRY_PADDING}px`;

    gameApp = new Application();
    await gameApp.init({
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        background: CANVAS_BG_COLOR,
    });

    entry.appendChild(gameApp.canvas);

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
                if (shape.isVisibleInContent(dimensions.CONTENT_OFFSET_Y)) {
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

            this.initializeUI();
        }

        initializeUI() {
            this.header = new Container();
            this.content = new Container();

            this.header.sortableChildren = true;
            this.header.zIndex = HEADER_Z_INDEX;

            this.content.sortableChildren = true;
            this.content.interactive = true;

            this.app.stage.addChild(this.header);
            this.app.stage.addChild(this.content);

            this.createHeaderElements();
            this.createContentElements();
        }

        createHeaderElements() {
            // Header background
            this.headerBg = new Graphics();

            // Shapes border and text
            this.shapesBorder = new Graphics();
            this.shapesText = new Text({
                text: `Shapes: 0`,
                style: {
                    fill: BASE_TEXT_COLOR,
                    fontSize: BASE_FONT_SIZE,
                },
            });

            // Area border and text
            this.areaBorder = new Graphics();
            this.areaText = new Text({
                text: `Area: 0 px²`,
                style: {
                    fill: BASE_TEXT_COLOR,
                    fontSize: BASE_FONT_SIZE,
                },
            });

            // Add to header
            this.header.addChild(this.headerBg);
            this.header.addChild(this.shapesBorder);
            this.header.addChild(this.shapesText);
            this.header.addChild(this.areaBorder);
            this.header.addChild(this.areaText);

            // Draw elements
            this.drawHeaderElements();
        }

        createContentElements() {
            this.contentBorder = new Graphics();
            this.content.addChild(this.contentBorder);

            this.drawContentElements();
        }

        drawHeaderElements() {
            const d = dimensions;

            // Header background
            this.headerBg.clear();
            this.headerBg.rect(0, 0, d.HEADER_WIDTH, d.HEADER_HEIGHT);
            this.headerBg.fill("cyan");

            // Shapes border
            this.shapesBorder.clear();
            this.shapesBorder.rect(
                d.SHAPES_OFFSET_X,
                d.SHAPES_OFFSET_Y,
                d.SHAPES_WIDTH,
                d.SHAPES_HEIGHT
            );
            this.shapesBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            this.shapesBorder.stroke();

            // Shapes text position
            this.shapesText.position.set(
                d.SHAPES_TEXT_OFFSET_X,
                d.SHAPES_TEXT_OFFSET_Y
            );

            // Area border
            this.areaBorder.clear();
            this.areaBorder.rect(
                d.AREA_OFFSET_X,
                d.AREA_OFFSET_Y,
                d.AREA_WIDTH,
                d.AREA_HEIGHT
            );
            this.areaBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            this.areaBorder.stroke();

            // Area text position
            this.areaText.position.set(
                d.AREA_TEXT_OFFSET_X,
                d.AREA_TEXT_OFFSET_Y
            );
        }

        drawContentElements() {
            const d = dimensions;

            // Content hit area
            this.content.hitArea = new Rectangle(
                d.CONTENT_OFFSET_X,
                d.CONTENT_OFFSET_Y,
                d.CONTENT_WIDTH,
                d.CONTENT_HEIGHT
            );

            // Content border
            this.contentBorder.clear();
            this.contentBorder.rect(
                d.CONTENT_OFFSET_X,
                d.CONTENT_OFFSET_Y,
                d.CONTENT_WIDTH,
                d.CONTENT_HEIGHT
            );
            this.contentBorder.setStrokeStyle({
                width: BASE_STROKE_WIDTH,
                color: BASE_STROKE_COLOR,
            });
            this.contentBorder.stroke();
            // this.contentBorder.fill("yellow");
        }

        adjustShapesPositions(scaleX, scaleY) {
            // Получаем границы контента
            const contentBounds = {
                left: dimensions.CONTENT_OFFSET_X,
                top: dimensions.CONTENT_OFFSET_Y,
                right: dimensions.CONTENT_OFFSET_X + dimensions.CONTENT_WIDTH,
                bottom: dimensions.CONTENT_OFFSET_Y + dimensions.CONTENT_HEIGHT,
            };

            // Перебираем все фигуры и обновляем их позиции
            this.model.shapes.forEach((shape) => {
                // Масштабируем позицию фигуры
                shape.x = Math.min(
                    Math.max(shape.x * scaleX, contentBounds.left + 20),
                    contentBounds.right - 20
                );

                // Для Y координаты учитываем, что верхняя часть может быть за пределами видимости
                if (shape.y > dimensions.CONTENT_OFFSET_Y) {
                    shape.y = Math.min(
                        Math.max(shape.y * scaleY, contentBounds.top),
                        contentBounds.bottom - 20
                    );
                }

                // Обновляем графику фигуры
                shape.graphics.x = shape.x;
                shape.graphics.y = shape.y;

                // Если у фигуры есть метод resize, вызываем его
                if (typeof shape.resize === "function") {
                    shape.resize(Math.min(scaleX, scaleY));
                }
            });
        }

        resize() {
            this.drawHeaderElements();
            this.drawContentElements();
        }

        render() {
            this.model.shapes.forEach((shape) => {
                this.content.addChild(shape.graphics);
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

            // Добавляем ticker для обновления
            gameApp.ticker.add(() => this.update());

            // Обработчики событий для мыши и тач-экранов
            this.setupEventHandlers();

            // Создаем элементы управления
            this.createControlButtons();

            // Запускаем спаунер
            this.startSpawning();
        }

        setupEventHandlers() {
            // Обработка события касания/клика
            this.view.content.onpointerdown = (event) => {
                if (event.target !== this.view.content) return;
                const y = event.data.global.y - dimensions.HEADER_HEIGHT;
                this.addShape(event.data.global.x, y);
            };

            // Дополнительные обработчики касаний для мобильных устройств
            // gameApp.canvas.addEventListener(
            //     "touchstart",
            //     (e) => {
            //         e.preventDefault();
            //         if (e.touches.length > 0) {
            //             touchStartX = e.touches[0].clientX;
            //             touchStartY = e.touches[0].clientY;
            //             isTouching = true;
            //         }
            //     },
            //     { passive: false }
            // );

            // gameApp.canvas.addEventListener(
            //     "touchmove",
            //     (e) => {
            //         e.preventDefault();
            //     },
            //     { passive: false }
            // );

            // gameApp.canvas.addEventListener("touchend", (e) => {
            //     isTouching = false;
            // });
        }

        startSpawning() {
            if (this.spawnLoop) clearInterval(this.spawnLoop); // Удаляем старый интервал

            this.spawnLoop = setInterval(() => {
                this.addShape(
                    Math.random() * dimensions.EXPERIMENTAL_VALUE,
                    OFFSET_Y
                );
            }, this.model.spawnRate);
        }

        addShape(x, y) {
            // Создаем случайную фигуру из доступных типов
            const ShapeClass =
                SHAPES[Math.floor(Math.random() * SHAPES.length)];
            const shape = new ShapeClass(x, y);

            // const SHAPES = [Circle, Ellipse, Hexagon, Pentagon, RandomIrregularShape, Square, Star, Triangle];
            // const shape = new Circle(x, y);
            // const shape = new Ellipse(x, y);
            // const shape = new Hexagon(x, y);
            // const shape = new Pentagon(x, y);
            // const shape = new RandomIrregularShape(x, y);
            // const shape = new Square(x, y);
            // const shape = new Star(x, y);
            // const shape = new Triangle(x, y);

            // Добавляем обработчик события для удаления фигуры
            this.handleShapePointerDown(shape);

            // Добавляем фигуру в модель
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
            controls.className = "ctrl-group";

            // Создаем мобильно-дружественные элементы управления
            controls.innerHTML = `
                <div class="row">
                    <button id="decreaseSpawn" class="btn">-</button>
                    <div>
                        <div>Spawn Rate</div>
                        <div id="spawnRate">${this.model.spawnRate} ms</div>
                    </div>
                    <button id="increaseSpawn" class="btn">+</button>
                </div>

                <div class="row">
                    <button id="decreaseGravity" class="btn">-</button>
                    <div>
                        <div>Gravity</div>
                        <div id="gravity">${this.model.gravity}</div>
                    </div>
                    <button id="increaseGravity" class="btn">+</button>
                </div>
            `;

            document.body.appendChild(controls);

            // Добавляем обработчики событий
            document.getElementById("decreaseSpawn").onclick = () => {
                this.model.spawnRate = Math.max(
                    200,
                    this.model.spawnRate - 200
                );
                document.getElementById(
                    "spawnRate"
                ).textContent = `${this.model.spawnRate} ms`;
                this.startSpawning();
            };

            document.getElementById("increaseSpawn").onclick = () => {
                this.model.spawnRate += 200;
                document.getElementById(
                    "spawnRate"
                ).textContent = `${this.model.spawnRate} ms`;
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
    gameModel = new GameModel();
    gameView = new GameView(gameApp, gameModel);
    gameController = new GameController(gameModel, gameView);
})();
