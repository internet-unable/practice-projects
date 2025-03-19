import { useRef, useState, useEffect } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Text, Sprite, Rectangle } from 'pixi.js';
extend({ Container, Text, Sprite });

import Square from "./classes/shapes/square";
import Circle from "./classes/shapes/circle";
import Triangle from "./classes/shapes/triangle";
import Pentagon from "./classes/shapes/pentagon";
import Ellipse from "./classes/shapes/ellipse";
import Star from "./classes/shapes/star";
import FallingShape from "./components/FallingShape";

const BASE_STROKE_WIDTH = 2
const BASE_STROKE_COLOR = "black";
const BASE_TEXT_COLOR = "black";
const BASE_FONT_SIZE = 18

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 660;
const CANVAS_BG_COLOR = "white";

const HEADER_HEIGHT = 60;
const HEADER_Z_INDEX = 1;

const HEADER_SHAPES_CONTAINER_WIDTH = 170;
const HEADER_SHAPES_CONTAINER_HEIGHT = 30;
const HEADER_SHAPES_CONTAINER_OFFSET_X = BASE_STROKE_WIDTH / 2;
const HEADER_SHAPES_CONTAINER_OFFSET_Y = HEADER_SHAPES_CONTAINER_HEIGHT + (BASE_STROKE_WIDTH / 2);
const HEADER_SHAPES_TEXT_OFFSET_X = 10 + (BASE_STROKE_WIDTH / 2);
const HEADER_SHAPES_TEXT_OFFSET_Y = HEADER_SHAPES_CONTAINER_HEIGHT + 5 + (BASE_STROKE_WIDTH / 2);

const HEADER_AREA_CONTAINER_WIDTH = 170;
const HEADER_AREA_CONTAINER_HEIGHT = 30;
const HEADER_AREA_CONTAINER_OFFSET_X = HEADER_SHAPES_CONTAINER_WIDTH + (BASE_STROKE_WIDTH / 2);
const HEADER_AREA_CONTAINER_OFFSET_Y = HEADER_AREA_CONTAINER_HEIGHT + (BASE_STROKE_WIDTH / 2);
const HEADER_AREA_TEXT_OFFSET_X = HEADER_AREA_CONTAINER_WIDTH + 10 + (BASE_STROKE_WIDTH / 2);
const HEADER_AREA_TEXT_OFFSET_Y = HEADER_AREA_CONTAINER_HEIGHT + 5 + (BASE_STROKE_WIDTH / 2);

const BODY_CONTAINER_WIDTH = CANVAS_WIDTH - BASE_STROKE_WIDTH;
const BODY_CONTAINER_HEIGHT = CANVAS_HEIGHT - HEADER_HEIGHT - BASE_STROKE_WIDTH;
const BODY_CONTAINER_OFFSET_X = BASE_STROKE_WIDTH / 2;
const BODY_CONTAINER_OFFSET_Y = HEADER_HEIGHT + (BASE_STROKE_WIDTH / 2);

const offsetY = -60;
const shapeClasses = [Square, Circle, Triangle, Pentagon, Ellipse, Star];

const App = () => {
    const ref = useRef(null);
    const [shapes, setShapes] = useState([]);
    const [visibleShapes, setVisibleShapes] = useState([]);
    const [totalArea, setTotalArea] = useState(0);
    const [spawnRate, setSpawnRate] = useState(1000);
    const [gravity, setGravity] = useState(1);
    // console.log(ref.current?.getSize());

    useEffect(() => {
        const interval = setInterval(() => {
            const ShapeClass = shapeClasses[Math.floor(Math.random() * shapeClasses.length)];
            setShapes(prev => [...prev, new ShapeClass(Math.random() * 760, offsetY)]);
        }, spawnRate);
        return () => clearInterval(interval);
    }, [spawnRate]);

    useEffect(() => {
        const visible = shapes.filter((shape) => shape.isVisible());
        setVisibleShapes(visible);
        setTotalArea(visible.reduce((sum, shape) => sum + shape.getArea(), 0));
    }, [shapes]);

    const removeShape = shapeToRemove => {
        setShapes((prev) => prev.filter((shape) => shape !== shapeToRemove));
    };

    const handleContainerClick = (event) => {
        if (event.target !== event.currentTarget) return;
        const x = event.data.global.x;
        const y = event.data.global.y;
        const ShapeClass = shapeClasses[Math.floor(Math.random() * shapeClasses.length)];
        setShapes((prev) => [...prev, new ShapeClass(x, y)]);
    };

    return (
        <>
            <div className="parent">
                <Application width={CANVAS_WIDTH} height={CANVAS_HEIGHT} backgroundColor={CANVAS_BG_COLOR}>
                    <pixiContainer
                        sortableChildren={true}
                        zIndex={HEADER_Z_INDEX}
                    >
                        <pixiGraphics
                            draw={graphics => {
                                graphics.clear();
                                graphics.rect(0, 0, CANVAS_WIDTH, HEADER_HEIGHT);
                                graphics.fill();
                            }}
                        />

                        <pixiGraphics
                            draw={graphics => {
                                graphics.clear();
                                graphics.setStrokeStyle({ width: BASE_STROKE_WIDTH, color: BASE_STROKE_COLOR })
                                graphics.rect(HEADER_SHAPES_CONTAINER_OFFSET_X, HEADER_SHAPES_CONTAINER_OFFSET_Y, HEADER_SHAPES_CONTAINER_WIDTH, HEADER_SHAPES_CONTAINER_HEIGHT);
                                graphics.stroke();
                            }}
                        />
                        <pixiText text={`Shapes: ${visibleShapes.length}`} x={HEADER_SHAPES_TEXT_OFFSET_X} y={HEADER_SHAPES_TEXT_OFFSET_Y} style={{ fill: BASE_TEXT_COLOR, fontSize: BASE_FONT_SIZE }} />

                        <pixiGraphics
                            draw={graphics => {
                                graphics.clear();
                                graphics.setStrokeStyle({ width: BASE_STROKE_WIDTH, color: BASE_STROKE_COLOR })
                                graphics.rect(HEADER_AREA_CONTAINER_OFFSET_X, HEADER_AREA_CONTAINER_OFFSET_Y, HEADER_AREA_CONTAINER_WIDTH, HEADER_AREA_CONTAINER_HEIGHT);
                                graphics.stroke();
                            }}
                        />
                        <pixiText text={`Area: ${Math.round(totalArea)} px²`} x={HEADER_AREA_TEXT_OFFSET_X} y={HEADER_AREA_TEXT_OFFSET_Y} style={{ fill: BASE_TEXT_COLOR, fontSize: BASE_FONT_SIZE }} />
                    </pixiContainer>

                    <pixiContainer
                        sortableChildren={true}
                        interactive={true}
                        onPointerDown={handleContainerClick}
                        hitArea={new Rectangle(0, 0, CANVAS_WIDTH, (CANVAS_HEIGHT - HEADER_HEIGHT))}
                        ref={ref}
                    >
                        <pixiGraphics
                            draw={graphics => {
                                graphics.clear();
                                graphics.rect(BODY_CONTAINER_OFFSET_X, BODY_CONTAINER_OFFSET_Y, BODY_CONTAINER_WIDTH, BODY_CONTAINER_HEIGHT);
                                graphics.setStrokeStyle({ width: BASE_STROKE_WIDTH, color: BASE_STROKE_COLOR })
                                graphics.stroke();
                                // graphics.setFillStyle({ color: "yellow" })
                                // graphics.fill();
                            }}
                        />

                        {shapes.map((shape, index) => (
                            <FallingShape
                                key={index}
                                shape={shape}
                                gravity={gravity}
                                onRemove={removeShape}
                            />
                        ))}
                    </pixiContainer>
                </Application>

                <div>
                    <div>
                        <button onClick={() => setSpawnRate((prev) => Math.max(200, prev - 200))}>-</button>
                        Spawn Rate: {spawnRate} ms
                        <button onClick={() => setSpawnRate((prev) => prev + 200)}>+</button>
                    </div>
                    <div>
                        <button onClick={() => setGravity((prev) => Math.max(1, prev - 1))}>-</button>
                        Gravity: {gravity}
                        <button onClick={() => setGravity((prev) => prev + 1)}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default App;