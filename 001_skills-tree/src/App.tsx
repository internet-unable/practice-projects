import { useCallback } from "react";
import Dagre from "@dagrejs/dagre";
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
    Panel,
    ReactFlowProvider,
    useReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
} from "@xyflow/react";
// import { Button } from "@/components/ui/button";

import "@xyflow/react/dist/style.css";

const initialNodes = [
    {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "My skills" },
        // width: 50,
        // height: 50,
    },
    {
        id: "2",
        // position: { x: -100, y: 100 },
        position: { x: 0, y: 100 },
        data: { label: "Hard skills" },
    },
    {
        id: "3",
        // position: { x: 100, y: 100 },
        position: { x: 0, y: 200 },
        data: { label: "Soft skills" },
    },
];
const initialEdges = [
    { id: "1->2", source: "1", target: "2" },
    { id: "1->3", source: "1", target: "3" },
];
let nodeId = 3;

const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
        g.setNode(node.id, {
            ...node,
            width: node.measured?.width ?? 0,
            height: node.measured?.height ?? 0,
        })
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

function Flow() {
    const { fitView, addNodes } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onLayout = useCallback(
        (direction) => {
            console.log(nodes);
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            fitView();
        },
        [nodes, setNodes, edges, setEdges, fitView]
    );

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    );

    const handleAddNode = useCallback(() => {
        const id = `${++nodeId}`;
        const newNode = {
            id,
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
            },
            data: {
                label: `Node ${id}`,
            },
        };
        addNodes(newNode);
    }, [addNodes]);

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
                <Panel position="top-center">
                    <button onClick={handleAddNode}>Add node</button>
                </Panel>
                <Panel position="top-right">
                    <button onClick={() => onLayout("TB")}>
                        vertical layout
                    </button>
                    <button onClick={() => onLayout("LR")}>
                        horizontal layout
                    </button>
                </Panel>
            </ReactFlow>
        </div>
    );
}

export default function App() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}
