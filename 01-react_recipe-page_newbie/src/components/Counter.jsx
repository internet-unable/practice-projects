import { useState, useEffect } from 'react';

export default function Counter() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("Effect start:", counter);

        return () => {
            console.log("Effect end:", counter);
        }
    }, [counter]);

    function handleCounterIncrease() {
        setCounter(counter + 1);
    }

    function handleCounterDecrease() {
        setCounter(counter - 1);
    }

    return (
        <div>
            <button onClick={handleCounterIncrease}>Increase counter</button>
            <span>{counter}</span>
            <button onClick={handleCounterDecrease}>Decrease counter</button>
        </div>
    );
}