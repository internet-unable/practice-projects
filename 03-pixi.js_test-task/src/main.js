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
