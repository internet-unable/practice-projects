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
    const width = Math.min(window.innerWidth - (BASE_ENTRY_PADDING * 2), BASE_CANVAS_WIDTH);
    const height = Math.min(window.innerHeight - 80 - (BASE_ENTRY_PADDING * 2), BASE_CANVAS_HEIGHT); // Учитываем пространство для элементов управления
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
        
        EXPERIMENTAL_VALUE: width - 50
    };
}

let dimensions = calculateDimensions();

// Добавляем прослушиватель событий для перерасчета размеров при изменении размера окна
window.addEventListener('resize', () => {
    dimensions = calculateDimensions();
    console.log(dimensions);
    if (gameApp) {
        gameApp.renderer.resize(CANVAS_WIDTH, CANVAS_HEIGHT);
        // Обновляем представление, если оно существует
        if (gameView) gameView.resize(dimensions);
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
        background: CANVAS_BG_COLOR
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
            
            // Создаем начальный интерфейс
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
            
            // Создаем элементы интерфейса
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
            this.areaText.position.set(d.AREA_TEXT_OFFSET_X, d.AREA_TEXT_OFFSET_Y);
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
        
        // Метод для перерисовки при изменении размеров
        resize(newDimensions) {
            // Перерисовываем элементы с новыми размерами
            this.drawHeaderElements();
            this.drawContentElements();
        }

        render() {
            // Добавляем фигуры в контент
            this.model.shapes.forEach((shape) => {
                this.content.addChild(shape.graphics);
            });

            // Обновляем счетчики
            this.shapesText.text = `Shapes: ${this.model.visibleShapesCount}`;
            this.areaText.text = `Area: ${Math.round(this.model.totalArea)} px²`;
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
            gameApp.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (e.touches.length > 0) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    isTouching = true;
                }
            }, { passive: false });
            
            gameApp.canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
            
            gameApp.canvas.addEventListener('touchend', (e) => {
                isTouching = false;
            });
        }

        startSpawning() {
            if (this.spawnLoop) clearInterval(this.spawnLoop); // Удаляем старый интервал

            this.spawnLoop = setInterval(() => {
                this.addShape(Math.random() * dimensions.EXPERIMENTAL_VALUE, OFFSET_Y);
            }, this.model.spawnRate);
        }

        addShape(x, y) {
            // Создаем случайную фигуру из доступных типов
            const ShapeClass = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            const shape = new ShapeClass(x, y);
            
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
            controls.style.textAlign = "center";
            controls.style.marginTop = "10px";
            controls.style.display = "flex";
            controls.style.flexDirection = "column";
            controls.style.gap = "10px";

            // Создаем мобильно-дружественные элементы управления
            controls.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
                  <button id="decreaseSpawn" style="width: 40px; height: 40px; font-size: 20px">-</button>
                  <div>
                    <div>Spawn Rate</div>
                    <div id="spawnRate">${this.model.spawnRate} ms</div>
                  </div>
                  <button id="increaseSpawn" style="width: 40px; height: 40px; font-size: 20px">+</button>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
                  <button id="decreaseGravity" style="width: 40px; height: 40px; font-size: 20px">-</button>
                  <div>
                    <div>Gravity</div>
                    <div id="gravity">${this.model.gravity}</div>
                  </div>
                  <button id="increaseGravity" style="width: 40px; height: 40px; font-size: 20px">+</button>
                </div>
                <div>
                  <button id="clearAll" style="padding: 8px 16px">Clear All</button>
                </div>
            `;

            document.body.appendChild(controls);

            // Добавляем обработчики событий
            document.getElementById("decreaseSpawn").onclick = () => {
                this.model.spawnRate = Math.max(200, this.model.spawnRate - 200);
                document.getElementById("spawnRate").textContent = `${this.model.spawnRate} ms`;
                this.startSpawning();
            };

            document.getElementById("increaseSpawn").onclick = () => {
                this.model.spawnRate += 200;
                document.getElementById("spawnRate").textContent = `${this.model.spawnRate} ms`;
                this.startSpawning();
            };

            document.getElementById("decreaseGravity").onclick = () => {
                this.model.gravity = Math.max(1, this.model.gravity - 1);
                document.getElementById("gravity").textContent = this.model.gravity;
            };

            document.getElementById("increaseGravity").onclick = () => {
                this.model.gravity += 1;
                document.getElementById("gravity").textContent = this.model.gravity;
            };
            
            // Добавляем кнопку для очистки всех фигур
            document.getElementById("clearAll").onclick = () => {
                while (this.model.shapes.length > 0) {
                    this.removeShape(this.model.shapes[0]);
                }
            };
        }
    }

    // === ЗАПУСК ИГРЫ === //
    gameModel = new GameModel();
    gameView = new GameView(gameApp, gameModel);
    gameController = new GameController(gameModel, gameView);
})();