import { useState, useEffect } from "react";
import { extend } from "@pixi/react";
import { Graphics } from 'pixi.js';
extend({ Graphics });

const FallingShape = ({ shape, gravity, onRemove }) => {
    const [y, setY] = useState(shape.y); // Локальное состояние Y

    useEffect(() => {
        const interval = setInterval(() => {
            setY(prevY => prevY + gravity); // Обновляем Y в state
        }, 50);

        return () => clearInterval(interval);
    }, [gravity]); // Перезапуск при изменении gravity

    const drawShape = (graphics) => {
        shape.draw(graphics, shape.x, y);
    }

    const handlePointerDown = event => {
        event.stopPropagation();
        onRemove(shape);
    }

    return (
        <pixiGraphics
            draw={drawShape}
            eventMode="static"
            onPointerDown={handlePointerDown} />
    );
};

export default FallingShape;