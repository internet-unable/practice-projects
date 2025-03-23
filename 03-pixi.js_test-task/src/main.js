import { Application } from "pixi.js";
import { BASE_SETTINGS, HEADER_SETTINGS } from "./utils/constants";
import { getDeviceDimensions } from "./utils/helpers";

import GameModel from "./core/GameModel";
import GameView from "./core/GameView";
import GameController from "./core/GameController";

// import Circle from "./shapes/Circle";
// import Ellipse from "./shapes/Ellipse";
// import Hexagon from "./shapes/Hexagon";
// import Pentagon from "./shapes/Pentagon";
// // import RandomIrregularShape from "./shapes/RandomIrregularShape";
// import Square from "./shapes/Square";
// import Star from "./shapes/Star";
// import Triangle from "./shapes/Triangle";

import "./style.css";

// const SHAPES = [
//     Circle,
//     Ellipse,
//     Hexagon,
//     Pentagon,
//     // RandomIrregularShape,
//     Square,
//     Star,
//     Triangle,
// ];

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

    // === ЗАПУСК ИГРЫ === //
    gameModel = new GameModel();
    gameView = new GameView(gameApp, gameModel, dimensions);
    gameController = new GameController(gameApp, gameModel, gameView, dimensions);
})();
