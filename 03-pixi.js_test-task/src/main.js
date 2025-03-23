import { Application } from "pixi.js";
import { BASE_SETTINGS, HEADER_SETTINGS } from "./utils/constants";
import { getDeviceDimensions } from "./utils/helpers";

import GameModel from "./core/GameModel";
import GameView from "./core/GameView";

import Circle from "./shapes/Circle";
import Ellipse from "./shapes/Ellipse";
import Hexagon from "./shapes/Hexagon";
import Pentagon from "./shapes/Pentagon";
// import RandomIrregularShape from "./shapes/RandomIrregularShape";
import Square from "./shapes/Square";
import Star from "./shapes/Star";
import Triangle from "./shapes/Triangle";

import "./style.css";

const SHAPES = [
    Circle,
    Ellipse,
    Hexagon,
    Pentagon,
    // RandomIrregularShape,
    Square,
    Star,
    Triangle,
];

let gameApp, gameModel, gameView, gameController;
let dimensions = calculateDimensions();

function calculateDimensions() {
    const { width, height } = getDeviceDimensions();

    return {
        CANVAS_WIDTH: width,
        CANVAS_HEIGHT: height,
        HEADER_WIDTH: width,
        CONTENT_WIDTH: width - BASE_SETTINGS.STROKE_WIDTH,
        CONTENT_HEIGHT: height - HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH,
        EXPERIMENTAL_VALUE: width - 50,
    };
}

window.addEventListener("resize", () => {
    const oldWidth = dimensions.CANVAS_WIDTH;
    const oldHeight = dimensions.CANVAS_HEIGHT;

    dimensions = calculateDimensions();

    const scaleX =
        dimensions.CONTENT_WIDTH / (oldWidth - BASE_SETTINGS.STROKE_WIDTH);
    const scaleY =
        dimensions.CONTENT_HEIGHT /
        (oldHeight - HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH);

    if (gameApp) {
        gameApp.renderer.resize(dimensions.CANVAS_WIDTH, dimensions.CANVAS_HEIGHT);
    }

    if (gameView) {
        gameView.resize(dimensions);
        gameView.adjustShapesPositions(dimensions, scaleX, scaleY);
    }
});

(async () => {
    // === ИНИЦИАЛИЗАЦИЯ PIXI === //
    const entry = document.getElementById("app");
    entry.style.padding = `${BASE_SETTINGS.ENTRY_POINT_PADDING}px`;

    gameApp = new Application();
    await gameApp.init({
        width: dimensions.CANVAS_WIDTH,
        height: dimensions.CANVAS_HEIGHT,
        background: BASE_SETTINGS.CANVAS_BG_COLOR,
    });

    entry.insertBefore(gameApp.canvas, BASE_SETTINGS.CTRL_GROUP);

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
                const y = event.data.global.y - HEADER_SETTINGS.HEIGHT;
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
                this.addShape(Math.random() * dimensions.EXPERIMENTAL_VALUE, 0);
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
            // const controls = document.createElement("div");
            // controls.className = "ctrl-group";

            // Создаем мобильно-дружественные элементы управления
            // controls.innerHTML = `
            //     <div class="row">
            //         <button id="decreaseSpawn" class="btn">-</button>
            //         <div>
            //             <div>Spawn Rate</div>
            //             <div id="spawnRate">${this.model.spawnRate} ms</div>
            //         </div>
            //         <button id="increaseSpawn" class="btn">+</button>
            //     </div>

            //     <div class="row">
            //         <button id="decreaseGravity" class="btn">-</button>
            //         <div>
            //             <div>Gravity</div>
            //             <div id="gravity">${this.model.gravity}</div>
            //         </div>
            //         <button id="increaseGravity" class="btn">+</button>
            //     </div>
            // `;

            // document.body.appendChild(controls);

            // Добавляем обработчики событий
            const decreaseSpawnBtn = document.getElementById("decreaseSpawn");
            const spawnRateEl = document.getElementById("spawnRate");
            const increaseSpawnBtn = document.getElementById("increaseSpawn");
            const decreaseGravityBtn =
                document.getElementById("decreaseGravity");
            const gtavityEl = document.getElementById("gravity");
            const increaseGravityBtn =
                document.getElementById("increaseGravity");

            spawnRateEl.textContent = `${this.model.spawnRate} ms`;
            gtavityEl.textContent = this.model.gravity;

            decreaseSpawnBtn.onclick = () => {
                this.model.spawnRate = Math.max(
                    1000,
                    this.model.spawnRate - 1000
                );
                spawnRateEl.textContent = `${this.model.spawnRate} ms`;
                this.startSpawning();
            };

            increaseSpawnBtn.onclick = () => {
                this.model.spawnRate += 1000;
                spawnRateEl.textContent = `${this.model.spawnRate} ms`;
                this.startSpawning();
            };

            decreaseGravityBtn.onclick = () => {
                this.model.gravity = Math.max(1, this.model.gravity - 1);
                gtavityEl.textContent = this.model.gravity;
            };

            increaseGravityBtn.onclick = () => {
                this.model.gravity += 1;
                gtavityEl.textContent = this.model.gravity;
            };
        }
    }

    // === ЗАПУСК ИГРЫ === //
    gameModel = new GameModel();
    gameView = new GameView(gameApp, gameModel, dimensions);
    gameController = new GameController(gameModel, gameView);
})();
