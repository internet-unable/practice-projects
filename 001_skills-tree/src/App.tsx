// export default App
import { ReactFlow } from "@xyflow/react";
import { Button } from "@/components/ui/button";

import "@xyflow/react/dist/style.css";

const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "Programming" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "Trading" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function App() {
    return (
        <div>
            <div style={{ width: "50vw", height: "100vh" }}>
                <div className="flex flex-col items-center justify-center min-h-svh">
                    <Button>Click me</Button>
                </div>
            </div>
            <div style={{ width: "50vw", height: "100vh" }}>
                <ReactFlow nodes={initialNodes} edges={initialEdges} />
            </div>
        </div>
    );
}

export default App;
