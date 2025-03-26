import { Application } from "pixi.js";
import { BASE_SETTINGS, HEADER_SETTINGS } from "./utils/constants";
import { calculateDimensions } from "./utils/helpers";

import GameModel from "./core/GameModel";
import GameView from "./core/GameView";
import GameController from "./core/GameController";

import "./style.css";

const entryPoint = document.getElementById("app");
let gameBoard, gameModel, gameView, gameController;
let dimensions = calculateDimensions();

(async () => {
    gameBoard = new Application();

    await gameBoard.init({
        width: dimensions.CANVAS_WIDTH,
        height: dimensions.CANVAS_HEIGHT,
        background: BASE_SETTINGS.CANVAS_BG_COLOR,
    });
    entryPoint.insertBefore(gameBoard.canvas, BASE_SETTINGS.CTRL_GROUP);
    entryPoint.style.padding = `${BASE_SETTINGS.ENTRY_POINT_PADDING}px`;

    gameModel = new GameModel();
    gameView = new GameView(gameBoard, dimensions);
    gameController = new GameController(
        gameBoard,
        gameModel,
        gameView,
        dimensions
    );
})();

window.addEventListener("resize", () => {
    // get prev canvas width and height
    const oldWidth = dimensions.CANVAS_WIDTH;
    const oldHeight = dimensions.CANVAS_HEIGHT;

    // update dimension, according to resize
    dimensions = calculateDimensions();

    if (gameBoard) {
        // adjust game board size
        gameBoard.renderer.resize(
            dimensions.CANVAS_WIDTH,
            dimensions.CANVAS_HEIGHT
        );
    }

    if (gameView) {
        // adjust header and content size
        gameView.resize(dimensions);
    }

    if (gameModel) {
        const scaleX =
            dimensions.CONTENT_WIDTH / (oldWidth - BASE_SETTINGS.STROKE_WIDTH);
        const scaleY =
            dimensions.CONTENT_HEIGHT /
            (oldHeight - HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH);
        // adjust position for each shape (x, y)
        gameModel.adjustShapesPositions(dimensions, scaleX, scaleY);
    }
});
