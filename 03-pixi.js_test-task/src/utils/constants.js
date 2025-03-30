export const BASE_SETTINGS = {
    ENTRY_POINT_PADDING: 20,
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    CANVAS_BG_COLOR: "white",
    STROKE_WIDTH: 2,
    STROKE_COLOR: "black",
    TEXT_COLOR: "black",
    FONT_SIZE: 18,
    GRAVITY: 1,
    SPAWN_RATE: 1000,
    CTRL_GROUP: "ctrlGroup",
    CTRL_DECREASE_SPAWN: "decreaseSpawnAmount",
    CTRL_INCREASE_SPAWN: "increaseSpawnAmount",
    CTRL_DECREASE_GRAVITY: "decreaseGravity",
    CTRL_INCREASE_GRAVITY: "increaseGravity",
    CTRL_SPAWN_EL: "spawnAmount",
    CTRL_GRAVITY_EL: "gravity"
};

export const HEADER_SETTINGS = {
    HEIGHT: 30,
    Z_INDEX: 1,
};

export const SHAPES_SETTINGS = {
    WIDTH: 110,
    HEIGHT: HEADER_SETTINGS.HEIGHT,
    OFFSET_X: BASE_SETTINGS.STROKE_WIDTH / 2,
    OFFSET_Y: BASE_SETTINGS.STROKE_WIDTH / 2,
    TEXT_OFFSET_X: 5 + BASE_SETTINGS.STROKE_WIDTH / 2,
    TEXT_OFFSET_Y: 5 + BASE_SETTINGS.STROKE_WIDTH / 2,
};

export const AREA_SETTINGS = {
    WIDTH: 150,
    HEIGHT: HEADER_SETTINGS.HEIGHT,
    OFFSET_X: SHAPES_SETTINGS.WIDTH + BASE_SETTINGS.STROKE_WIDTH / 2,
    OFFSET_Y: BASE_SETTINGS.STROKE_WIDTH / 2,
    TEXT_OFFSET_X: 5 + SHAPES_SETTINGS.WIDTH + BASE_SETTINGS.STROKE_WIDTH / 2,
    TEXT_OFFSET_Y: 5 + BASE_SETTINGS.STROKE_WIDTH / 2,
};

export const CONTENT_SETTINGS = {
    OFFSET_X: BASE_SETTINGS.STROKE_WIDTH / 2,
    OFFSET_Y: HEADER_SETTINGS.HEIGHT - BASE_SETTINGS.STROKE_WIDTH / 2,
};

export const CUSTOM_EVENTS = {
    SHAPE_ADDED: "shapeAdded",
    SHAPE_REMOVED: "shapeRemoved",
    TOTAL_COUNT_UPDATED: "totalCountUpdated",
    TOTAL_AREA_UPDATED: "totalAreaUpdated",
    SPAWN_AMOUNT_UPDATED: "spawnAmountUpdated",
    GRAVITY_UPDATED: "gravityUpdated",

    ADD_SHAPE: "addShape",
    REMOVE_SHAPE: "removeShape",
    SHAPES_Y_UPDATE: "shapesYUpdate",
    DECREASE_SPAWN_AMOUNT: "decreaseSpawnAmount",
    INCREASE_SPAWN_AMOUNT: "increaseSpawnAmount",
    DECREASE_GRAVITY: "decreaseGravity",
    INCREASE_GRAVITY: "increaseGravity",

    WINDOW_RESIZE: "windowResize",

    SET_SPAWN_AMOUNT_TEXT: "setSpawnAmountText",
    SET_GRAVITY_TEXT: "setGravityText"
}