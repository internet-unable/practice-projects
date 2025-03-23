import { Application } from "pixi.js";
import { BASE_SETTINGS, HEADER_SETTINGS } from "./utils/constants";
import { calculateDimensions } from "./utils/helpers";

import GameModel from "./core/GameModel";
import GameView from "./core/GameView";
import GameController from "./core/GameController";

import "./style.css";

const entry = document.getElementById("app");
entry.style.padding = `${BASE_SETTINGS.ENTRY_POINT_PADDING}px`;
let gameApp, gameModel, gameView, gameController;
let dimensions = calculateDimensions();

(async () => {
    gameApp = new Application();

    await gameApp.init({
        width: dimensions.CANVAS_WIDTH,
        height: dimensions.CANVAS_HEIGHT,
        background: BASE_SETTINGS.CANVAS_BG_COLOR,
    });
    entry.insertBefore(gameApp.canvas, BASE_SETTINGS.CTRL_GROUP);

    gameModel = new GameModel();
    gameView = new GameView(gameApp, gameModel, dimensions);
    gameController = new GameController(gameApp, gameModel, gameView, dimensions);
})();

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