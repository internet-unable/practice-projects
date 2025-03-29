import { Application } from "pixi.js";
import { BASE_SETTINGS } from "./utils/constants";
import { calculateDimensions } from "./utils/helpers";

import GameModel from "./core/GameModel";
import GameView from "./core/GameView";
import GameController from "./core/GameController";

import "./style.css";

const entryPoint = document.getElementById("app");
const ctrlGroup = document.getElementById(BASE_SETTINGS.CTRL_GROUP);
let gameBoard, gameModel, gameView, gameController;
let dimensions = calculateDimensions();

(async () => {
    gameBoard = new Application();

    await gameBoard.init({
        width: dimensions.CANVAS_WIDTH,
        height: dimensions.CANVAS_HEIGHT,
        background: BASE_SETTINGS.CANVAS_BG_COLOR,
    });
    entryPoint.insertBefore(gameBoard.canvas, ctrlGroup);
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

// Todo: consider move to controller
window.addEventListener("resize", () => {
    // get prev canvas width
    const oldWidth = dimensions.CANVAS_WIDTH;

    // update dimension, because of resize
    dimensions = calculateDimensions();

    if (gameBoard) {
        // adjust game board size
        gameBoard.renderer.resize(
            dimensions.CANVAS_WIDTH,
            dimensions.CANVAS_HEIGHT
        );
    }

    if (gameController) {
        // adjust header and content size
        gameController.resizeHeaderAndContent(dimensions);

        // adjust X position for each shape
        const scaleX =
            dimensions.CONTENT_WIDTH / (oldWidth - BASE_SETTINGS.STROKE_WIDTH);
        gameController.adjustShapesPositionX(dimensions, scaleX);
    }
});
